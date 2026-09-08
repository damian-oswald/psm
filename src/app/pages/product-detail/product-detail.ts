import {ChangeDetectionStrategy, Component, computed, effect, inject, input, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ObAlertModule, ObExternalLinkModule} from '@oblique/oblique';
import {forkJoin, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {admissionStatus, formatNumbers, isTranslatableUnit, readQuantity, unitLabel} from '../../core/format';
import {Indication, LabelElement, Organization, ProductKind, Quantity, Term} from '../../core/models';
import {
	derivedProductsQuery,
	importNumbersQuery,
	indicationsQuery,
	ingredientsQuery,
	organizationQuery
} from '../../core/queries';
import {RegistryService} from '../../core/registry.service';
import {SparqlService, splitList} from '../../core/sparql.service';
import {GhsPictogramComponent} from '../../shared/ghs-pictogram';
import {StatusBadgeComponent} from '../../shared/status-badge';
import {TermSelectComponent} from '../../shared/term-select';

interface Ingredient {
	substance: Term;
	role?: string;
	shares: Quantity[];
}

/** Indications of one application area, which is how the admission documents group them. */
interface IndicationGroup {
	area: Term;
	indications: Indication[];
}

/**
 * Everything the registry holds about one product, on one page.
 *
 * The product itself comes from the in-memory index, so the page renders immediately;
 * the four detail queries — ingredients, permission holder, derived admissions and
 * indications — run in parallel and fill in as they arrive.
 */
@Component({
	selector: 'app-product-detail',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		GhsPictogramComponent,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		ObAlertModule,
		ObExternalLinkModule,
		RouterLink,
		StatusBadgeComponent,
		TermSelectComponent,
		TranslatePipe
	],
	templateUrl: './product-detail.html',
	styleUrl: './product-detail.scss'
})
export class ProductDetailPage {
	private readonly registry = inject(RegistryService);
	private readonly sparql = inject(SparqlService);
	private readonly translate = inject(TranslateService);

	/** The federal admission number, bound from the route by `withComponentInputBinding`. */
	readonly id = input.required<string>();

	readonly loading = signal(false);
	readonly ingredients = signal<Ingredient[]>([]);
	readonly organization = signal<Organization | undefined>(undefined);
	readonly derivedProducts = signal<{id: string; name: string; kind: ProductKind}[]>([]);
	readonly foreignAdmissionNumbers = signal<string[]>([]);
	readonly packageInsertNumbers = signal<string[]>([]);
	readonly indications = signal<Indication[]>([]);

	/** In-page filters over the indication tables, which can run to 85 rows. */
	readonly cropFilter = signal<string[]>([]);
	readonly pestFilter = signal<string[]>([]);
	readonly expanded = signal<string | undefined>(undefined);


	readonly product = computed(() => this.registry.productsById().get(this.id()));
	readonly ready = computed(() => this.registry.status() === 'ready');
	readonly status = computed(() => {
		const product = this.product();
		return product ? admissionStatus(product) : 'authorised';
	});

	/** The product whose indications apply: itself, or the one its admission rests on. */
	readonly indicationSource = computed(() => {
		const product = this.product();
		if (!product?.referenceProduct) {
			return undefined;
		}
		return this.registry.productsById().get(product.referenceProduct);
	});

	readonly typeLabels = computed(() => {
		const types = this.registry.productTypes();
		return (this.product()?.types ?? []).map(id => types.get(id)?.label ?? id);
	});

	readonly formulationTerms = computed(() => {
		const formulations = this.registry.formulations();
		return (this.product()?.formulations ?? []).map(id => formulations.get(id) ?? {id, label: id});
	});

	readonly formulationNames = computed(() => this.formulationTerms().map(term => term.label).join(', '));

	readonly activeSubstances = computed(() => this.ingredients().filter(ingredient => ingredient.role === 'ActiveSubstance'));

	/** Constituents the graph does not mark as an active substance or a co-formulant. */
	readonly otherIngredients = computed(() => this.ingredients().filter(ingredient => ingredient.role !== 'ActiveSubstance'));

	readonly countryLabel = computed(() => {
		const product = this.product();
		return product ? (this.registry.countries().get(product.country)?.label ?? product.country) : '';
	});

	private readonly labelElementsOfProduct = computed(() => {
		const elements = this.registry.labelElements();
		return (this.product()?.labelElements ?? [])
			.map(id => elements.get(id))
			.filter((element): element is LabelElement => !!element);
	});

	readonly pictograms = computed(() => this.byKind('HazardPictogram'));
	readonly signalWords = computed(() => this.byKind('SignalWord'));
	readonly hazardStatements = computed(() => this.byKind('HazardStatement'));
	readonly plantProtectionStatements = computed(() => this.byKind('PlantProtectionStatement'));

	/** Crops that occur in this product's indications, for the in-page filter. */
	readonly cropOptions = computed(() => this.indicationOptions(indication => indication.crops, this.registry.crops()));

	/** Pests likewise, so a long list of indications can be narrowed from either side. */
	readonly pestOptions = computed(() =>
		this.indicationOptions(indication => indication.pests.map(pest => pest.id), this.registry.pests())
	);

	readonly indicationGroups = computed<IndicationGroup[]>(() => {
		const areas = this.registry.applicationAreas();
		const crops = this.registry.crops();
		const selectedCrops = this.cropFilter();
		const selectedPests = this.pestFilter();
		const groups = new Map<string, Indication[]>();
		for (const indication of this.indications()) {
			if (selectedCrops.length && !indication.crops.some(id => selectedCrops.includes(id))) {
				continue;
			}
			if (selectedPests.length && !indication.pests.some(pest => selectedPests.includes(pest.id))) {
				continue;
			}
			const list = groups.get(indication.applicationArea) ?? [];
			list.push(indication);
			groups.set(indication.applicationArea, list);
		}
		return [...groups]
			.map(([id, indications]) => ({
				area: areas.get(id) ?? {id, label: id},
				indications: indications.sort((left, right) =>
					this.cropNames(left, crops).localeCompare(this.cropNames(right, crops))
				)
			}))
			.sort((left, right) => (left.area.code ?? '').localeCompare(right.area.code ?? ''));
	});

	readonly visibleIndicationCount = computed(() =>
		this.indicationGroups().reduce((total, group) => total + group.indications.length, 0)
	);

	readonly lindasLink = computed(() => `https://agriculture.ld.admin.ch/plant-protection/product/${this.id()}`);

	constructor() {
		effect(() => {
			const id = this.id();
			if (id) {
				this.loadDetail(id);
			}
		});

	}

	/** Counts how often each term of an indication field occurs, for an in-page filter. */
	private indicationOptions(pick: (indication: Indication) => string[], labels: Map<string, Term>): Term[] {
		const counts = new Map<string, number>();
		for (const indication of this.indications()) {
			for (const id of pick(indication)) {
				counts.set(id, (counts.get(id) ?? 0) + 1);
			}
		}
		return [...counts]
			.map(([id, count]) => ({id, label: labels.get(id)?.label ?? id, count}))
			.sort((left, right) => left.label.localeCompare(right.label));
	}

	label(map: Map<string, Term>, id: string): string {
		return map.get(id)?.label ?? id;
	}

	countryName(id: string | undefined): string {
		return id ? this.label(this.registry.countries(), id) : '';
	}

	cropLabel(id: string): string {
		return this.label(this.registry.crops(), id);
	}

	pestLabel(id: string): string {
		return this.label(this.registry.pests(), id);
	}

	obligationTerm(id: string): Term {
		return this.registry.obligations().get(id) ?? {id, label: id};
	}

	commentTerm(id: string): Term {
		return this.registry.applicationComments().get(id) ?? {id, label: id};
	}

	substanceLabel(id: string): string {
		return this.label(this.registry.substances(), id);
	}

	/** Renders a quantity as text, translating the two units that have no `unitText`. */
	quantity(quantity: Quantity | undefined): string {
		if (!quantity) {
			return '';
		}
		const numbers = formatNumbers(quantity, this.translate.currentLang || 'de');
		const unit = isTranslatableUnit(quantity.unit)
			? (this.translate.instant(unitLabel(quantity.unit)) as string)
			: unitLabel(quantity.unit);
		return unit ? `${numbers} ${unit}` : numbers;
	}

	/** A substance with the shares recorded for it, as one line of the overview. */
	ingredientText(ingredient: Ingredient): string {
		const shares = ingredient.shares.map(share => this.quantity(share)).filter(text => text.length > 0);
		return shares.length ? `${ingredient.substance.label} (${shares.join(', ')})` : ingredient.substance.label;
	}

	toggle(id: string): void {
		this.expanded.update(current => (current === id ? undefined : id));
	}

	private byKind(kind: LabelElement['kind']): LabelElement[] {
		return this.labelElementsOfProduct()
			.filter(element => element.kind === kind)
			.sort((left, right) => (left.code ?? '').localeCompare(right.code ?? '', undefined, {numeric: true}));
	}

	private cropNames(indication: Indication, crops: Map<string, Term>): string {
		return indication.crops.map(id => crops.get(id)?.label ?? id).join(', ');
	}

	private loadDetail(id: string): void {
		this.loading.set(true);
		this.ingredients.set([]);
		this.organization.set(undefined);
		this.derivedProducts.set([]);
		this.indications.set([]);
		this.cropFilter.set([]);
		this.pestFilter.set([]);

		const product = this.product();
		// Indications live on the reference product for sale permissions and parallel imports.
		const indicationId = product?.referenceProduct ?? id;
		const holderId = product?.holder;

		forkJoin({
			ingredients: this.sparql.query(ingredientsQuery(id)),
			derived: this.sparql.query(derivedProductsQuery(id)),
			numbers: this.sparql.query(importNumbersQuery(id)),
			indications: this.sparql.query(indicationsQuery(indicationId)),
			organization: holderId ? this.sparql.query(organizationQuery(holderId)) : of([])
		})
			.pipe(catchError(() => of(undefined)))
			.subscribe(result => {
				this.loading.set(false);
				if (!result) {
					return;
				}
				this.ingredients.set(this.readIngredients(result.ingredients));
				this.derivedProducts.set(
					result.derived.map(row => ({id: row['id'], name: row['name'], kind: row['kind'] as ProductKind}))
				);
				this.foreignAdmissionNumbers.set(splitList(result.numbers[0]?.['foreignAdmissionNumbers']));
				this.packageInsertNumbers.set(splitList(result.numbers[0]?.['packageInsertNumbers']));
				this.indications.set(result.indications.map(row => this.readIndication(row)));
				this.organization.set(holderId ? this.readOrganization(holderId, result.organization[0]) : undefined);
			});
	}

	private readIngredients(rows: {[key: string]: string}[]): Ingredient[] {
		const substances = this.registry.substances();
		const merged = new Map<string, Ingredient>();
		for (const row of rows) {
			const id = this.registry.canonical(row['substance']);
			const ingredient = merged.get(id) ?? {
				substance: substances.get(id) ?? {id, label: id},
				role: row['role'],
				shares: []
			};
			const share = readQuantity(row, 'share');
			if (share) {
				ingredient.shares.push(share);
			}
			merged.set(id, ingredient);
		}
		// Active substances first, then co-formulants, then substances with no stated role.
		const order = (role?: string): number => (role === 'ActiveSubstance' ? 0 : role === 'CoFormulant' ? 1 : 2);
		return [...merged.values()].sort(
			(left, right) => order(left.role) - order(right.role) || left.substance.label.localeCompare(right.substance.label)
		);
	}

	private readIndication(row: {[key: string]: string}): Indication {
		// Identifiers arrive straight from the endpoint, so the duplicated concepts the
		// registry folds together have to be folded here as well to stay labelled.
		const canonical = (ids: string[]): string[] => [...new Set(ids.map(id => this.registry.canonical(id)))];
		return {
			id: row['id'],
			applicationArea: this.registry.canonical(row['applicationArea']),
			crops: canonical(splitList(row['crops'])),
			pests: this.readPests(row['pests']),
			obligations: canonical(splitList(row['obligations'])),
			comments: canonical(splitList(row['comments'])),
			dosage: readQuantity(row, 'dosage'),
			expenditure: readQuantity(row, 'expenditure'),
			waitingPeriod: readQuantity(row, 'waiting')
		};
	}

	/** Reads the `pest~effect` pairs, folding duplicated pests onto one entry. */
	private readPests(value: string | undefined): Indication['pests'] {
		const effects = new Map<string, Indication['pests'][number]['effect']>();
		for (const entry of splitList(value)) {
			const [rawId, effect] = entry.split('~');
			const id = this.registry.canonical(rawId);
			if (!effects.has(id) || (!effects.get(id) && effect)) {
				effects.set(id, (effect || '') as Indication['pests'][number]['effect']);
			}
		}
		return [...effects].map(([id, effect]) => ({id, effect}));
	}

	private readOrganization(id: string, row: {[key: string]: string} | undefined): Organization | undefined {
		if (!row) {
			return undefined;
		}
		return {
			id,
			legalName: row['legalName'],
			street: row['street'],
			postalCode: row['postalCode'],
			locality: row['locality'],
			country: row['country'],
			telephones: splitList(row['telephones']),
			emails: splitList(row['emails'])
		};
	}
}

