import {Injectable, computed, inject, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Crop, LabelElement, LabelElementKind, Product, ProductKind, Term} from './models';
import {PRODUCT_INDEX_QUERY, PRODUCT_USE_INDEX_QUERY, countriesQuery, termsQuery} from './queries';
import {Row, SparqlService, splitList} from './sparql.service';

/** The 23 product type classes, in the order the data model lists them. */
export const PRODUCT_TYPES = [
	'BiologicalControlAgent',
	'AntifungalBiologicalAgent',
	'BacterialBiologicalAgent',
	'FungalBiologicalAgent',
	'InsectVirusAgent',
	'BeneficialInsectAgent',
	'BeneficialMiteAgent',
	'BeneficialNematodeAgent',
	'ChemicalPlantProtectionProduct',
	'Acaricide',
	'WettingAndAdhesionAgent',
	'Bactericide',
	'Disinfectant',
	'Fungicide',
	'Herbicide',
	'Insecticide',
	'Pheromone',
	'SoapBasedInsecticide',
	'Molluscicide',
	'PlantDefenseInducer',
	'Nematicide',
	'PlantGrowthRegulator',
	'Rodenticide',
	'SeedTreatmentProduct',
	'StorageProtectionProduct',
	'Viricide'
] as const;

export type LoadingStatus = 'loading' | 'ready' | 'error';

const LABEL_ELEMENT_KINDS: Record<string, LabelElementKind> = {
	HazardPictogram: 'HazardPictogram',
	SignalWord: 'SignalWord',
	HazardStatement: 'HazardStatement',
	PlantProtectionStatement: 'PlantProtectionStatement'
};

/**
 * Holds the whole registry in memory and keeps its labels in the active language.
 *
 * Three queries are enough to answer every question the search page asks: the product
 * index, the crops and pests each product may be used against, and the code list labels.
 * Together they are around 600 kB gzipped and take about two seconds to load once, after
 * which searching, filtering and faceting never touch the network again.
 */
@Injectable({providedIn: 'root'})
export class RegistryService {
	private readonly sparql = inject(SparqlService);
	private readonly translate = inject(TranslateService);

	readonly status = signal<LoadingStatus>('loading');
	readonly error = signal<string | undefined>(undefined);

	readonly products = signal<Product[]>([]);
	readonly crops = signal(new Map<string, Crop>());
	readonly pests = signal(new Map<string, Term>());
	readonly obligations = signal(new Map<string, Term>());
	readonly applicationComments = signal(new Map<string, Term>());
	readonly substances = signal(new Map<string, Term>());
	readonly applicationAreas = signal(new Map<string, Term>());
	readonly formulations = signal(new Map<string, Term>());
	readonly labelElements = signal(new Map<string, LabelElement>());
	readonly countries = signal(new Map<string, Term>());

	/**
	 * Maps every duplicated term onto the one that represents it.
	 *
	 * The graph describes a handful of concepts twice under different IRIs — `EUH401` and
	 * five other hazard statements, thirty application comments, five substances. Left
	 * alone they appear twice in every option list, and selecting one of them silently
	 * misses the products that reference the other, so all of them are folded onto one.
	 */
	private readonly canonicalIds = signal(new Map<string, string>());

	/** Product type labels come from the application, since the graph has English only. */
	readonly productTypes = computed(() => {
		this.languageVersion();
		const types = new Map<string, Term>();
		for (const id of PRODUCT_TYPES) {
			types.set(id, {id, label: this.translate.instant(`registry.productType.${id}`) as string});
		}
		return types;
	});

	readonly holders = computed(() => {
		const holders = new Map<string, Term>();
		for (const product of this.products()) {
			if (product.holder && !holders.has(product.holder)) {
				holders.set(product.holder, {id: product.holder, label: product.holderName ?? product.holder});
			}
		}
		return holders;
	});

	readonly productsById = computed(() => new Map(this.products().map(product => [product.id, product])));

	/** Bumped on every language change so that computed labels recalculate. */
	private readonly languageVersion = signal(0);

	private started = false;

	/** Loads the index once, then reloads only the labels when the language changes. */
	load(): void {
		if (this.started) {
			return;
		}
		this.started = true;
		this.loadEverything();
		this.translate.onLangChange.subscribe(() => {
			this.languageVersion.update(version => version + 1);
			this.loadTerms();
		});
	}

	private loadEverything(): void {
		this.status.set('loading');
		forkJoin({
			products: this.sparql.query(PRODUCT_INDEX_QUERY),
			uses: this.sparql.query(PRODUCT_USE_INDEX_QUERY),
			terms: this.sparql.query(termsQuery(this.language())),
			countries: this.sparql.query(countriesQuery(this.language()))
		})
			.pipe(
				tap(({terms, countries}) => {
					this.applyTerms(terms);
					this.applyCountries(countries);
				}),
				map(({products, uses}) => this.buildProducts(products, uses)),
				catchError((error: Error) => {
					this.error.set(error.message);
					this.status.set('error');
					return of(undefined);
				})
			)
			.subscribe(products => {
				if (products) {
					this.products.set(products);
					this.status.set('ready');
				}
			});
	}

	private loadTerms(): void {
		forkJoin({
			terms: this.sparql.query(termsQuery(this.language())),
			countries: this.sparql.query(countriesQuery(this.language()))
		})
			.pipe(catchError(() => of(undefined)))
			.subscribe(result => {
				if (result) {
					this.applyTerms(result.terms);
					this.applyCountries(result.countries);
					// Crop ancestry feeds the haystack, so the products are rebuilt with new labels.
					this.products.update(products => products.map(product => ({...product, haystack: this.haystack(product)})));
				}
			});
	}

	private language(): string {
		return (this.translate.currentLang || this.translate.getDefaultLang() || 'de').split('-')[0];
	}

	private applyCountries(rows: Row[]): void {
		this.countries.set(new Map(rows.map(row => [row['id'], {id: row['id'], label: row['label'] ?? row['id']}])));
	}

	/** The term that stands for `id`, which is `id` itself unless the graph duplicates it. */
	canonical(id: string): string {
		return this.canonicalIds().get(id) ?? id;
	}

	/** Every identifier that means what `id` means, for querying the endpoint. */
	aliases(id: string): string[] {
		const canonical = this.canonical(id);
		const all = [...this.canonicalIds()].filter(([, target]) => target === canonical).map(([alias]) => alias);
		return all.length ? all : [canonical];
	}

	private applyTerms(rows: Row[]): void {
		const canonicalIds = resolveDuplicates(rows);
		const crops = new Map<string, Crop>();
		const pests = new Map<string, Term>();
		const obligations = new Map<string, Term>();
		const comments = new Map<string, Term>();
		const substances = new Map<string, Term>();
		const areas = new Map<string, Term>();
		const formulations = new Map<string, Term>();
		const labelElements = new Map<string, LabelElement>();

		for (const row of rows) {
			const id = row['id'];
			if (canonicalIds.get(id) !== id) {
				continue;
			}
			const label = row['label'] ?? id;
			// Crops and pests carry their own UUID as `schema:identifier`, which is not a code.
			const code = row['code'] && !id.endsWith(row['code']) ? row['code'] : undefined;
			const term: Term = {id, label, code};
			switch (row['type']) {
				case 'Crop':
					crops.set(id, {
						...term,
						parents: splitList(row['parents']).map(parent => canonicalIds.get(parent) ?? parent),
						ancestors: []
					});
					break;
				case 'Pest':
					pests.set(id, term);
					break;
				case 'Obligation':
					obligations.set(id, term);
					break;
				case 'ApplicationComment':
					comments.set(id, term);
					break;
				case 'Substance':
					substances.set(id, term);
					break;
				case 'ApplicationArea':
					areas.set(id, term);
					break;
				case 'FormulationType':
					formulations.set(id, term);
					break;
				default: {
					const kind = LABEL_ELEMENT_KINDS[row['type']];
					if (kind) {
						labelElements.set(id, {...term, kind});
					}
				}
			}
		}

		resolveAncestors(crops);
		this.canonicalIds.set(canonicalIds);
		this.crops.set(crops);
		this.pests.set(pests);
		this.obligations.set(obligations);
		this.applicationComments.set(comments);
		this.substances.set(substances);
		this.applicationAreas.set(areas);
		this.formulations.set(formulations);
		this.labelElements.set(labelElements);
	}

	private buildProducts(productRows: Row[], useRows: Row[]): Product[] {
		const uses = new Map(useRows.map(row => [row['id'], row]));
		const crops = this.crops();
		const canonical = (ids: string[]): string[] => [...new Set(ids.map(id => this.canonical(id)))];

		const products = productRows.map<Product>(row => ({
			id: row['id'],
			name: row['name'],
			admissionNumber: row['admissionNumber'],
			kind: (row['kind'] as ProductKind) || 'RegularProduct',
			types: splitList(row['types']),
			country: row['country'],
			holder: row['holder'],
			holderName: row['holderName'],
			formulations: canonical(splitList(row['formulations'])),
			substances: canonical(splitList(row['substances'])),
			labelElements: canonical(splitList(row['labelElements'])),
			exhaustionDeadline: row['exhaustionDeadline'],
			soldOutDeadline: row['soldOutDeadline'],
			referenceProduct: row['referenceProduct'],
			usesInherited: false,
			crops: [],
			cropsWithParents: [],
			pests: [],
			applicationAreas: [],
			obligations: [],
			haystack: ''
		}));

		// Sale permissions and parallel imports carry no indications of their own; they are
		// admitted on the strength of a reference product and inherit all of its uses.
		for (const product of products) {
			const own = uses.get(product.id);
			const inherited = own ?? (product.referenceProduct ? uses.get(product.referenceProduct) : undefined);
			product.usesInherited = !own && !!inherited;
			if (inherited) {
				product.crops = canonical(splitList(inherited['crops']));
				product.pests = canonical(splitList(inherited['pests']));
				product.applicationAreas = canonical(splitList(inherited['applicationAreas']));
				product.obligations = canonical(splitList(inherited['obligations']));
				product.cropsWithParents = withAncestors(product.crops, crops);
			}
			product.haystack = this.haystack(product);
		}
		return products;
	}

	/** Everything a free-text search should be able to reach, lower-cased once. */
	private haystack(product: Product): string {
		const substances = this.substances();
		return [
			product.name,
			product.admissionNumber,
			product.holderName ?? '',
			...product.substances.map(id => substances.get(id)?.label ?? '')
		]
			.join(' ')
			.toLowerCase();
	}
}

/**
 * Groups terms that describe the same concept under different identifiers.
 *
 * Two terms are the same concept when they belong to the same code list and carry the same
 * code and the same name. The name used is the German one, with French as a fallback, so
 * that the grouping does not shift when the interface language changes.
 */
function resolveDuplicates(rows: Row[]): Map<string, string> {
	const firstOfConcept = new Map<string, string>();
	const canonicalIds = new Map<string, string>();
	for (const row of rows) {
		const concept = `${row['type']}|${row['code'] ?? ''}|${row['stableLabel'] ?? row['id']}`;
		const first = firstOfConcept.get(concept);
		if (first) {
			canonicalIds.set(row['id'], first);
		} else {
			firstOfConcept.set(concept, row['id']);
			canonicalIds.set(row['id'], row['id']);
		}
	}
	return canonicalIds;
}

/** Fills in the transitive parents of every crop, so filters can match a whole branch. */
function resolveAncestors(crops: Map<string, Crop>): void {
	const resolve = (id: string, seen: Set<string>): string[] => {
		const crop = crops.get(id);
		if (!crop || seen.has(id)) {
			return [];
		}
		seen.add(id);
		return crop.parents.flatMap(parent => [parent, ...resolve(parent, seen)]);
	};
	for (const crop of crops.values()) {
		crop.ancestors = [...new Set(resolve(crop.id, new Set()))];
	}
}

function withAncestors(ids: string[], crops: Map<string, Crop>): string[] {
	const all = new Set<string>();
	for (const id of ids) {
		all.add(id);
		for (const ancestor of crops.get(id)?.ancestors ?? []) {
			all.add(ancestor);
		}
	}
	return [...all];
}
