import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ObAlertModule, ObNotificationService} from '@oblique/oblique';
import {catchError, of} from 'rxjs';
import {
	AdvancedCriteria,
	CombinableCriterion,
	EMPTY_CRITERIA,
	Effect,
	buildAdvancedQuery
} from '../../core/advanced-query';
import {RegistryService} from '../../core/registry.service';
import {SparqlService} from '../../core/sparql.service';
import {Combination, Product, ProductKind, Term} from '../../core/models';
import {ProductCardComponent} from '../../shared/product-card';
import {TermDropdownComponent} from '../../shared/term-dropdown';
import {TERM_CRITERIA, TermCriterion, isCombinable, isExclusion, matchesCriteria, valuesFor} from './criteria-match';

const KINDS: ProductKind[] = ['RegularProduct', 'SalePermission', 'ParallelImport'];
const EFFECTS: Effect[] = ['full', 'partial', 'side'];

/**
 * The waiting periods a question can be capped at, in days.
 *
 * The registry states waiting periods in days and in whole weeks; these are the values it
 * uses most, weeks written out in days, so every cap lines up with periods that exist.
 */
const WAITING_PERIODS = [0, 3, 7, 14, 21, 28, 42, 56, 90];

/**
 * Builds a SPARQL query out of things rather than words, runs it, and shows both.
 *
 * The search page answers "which products mention wheat and mention a weed"; this page
 * answers "which products are admitted against that weed *in* wheat", because the crop
 * and the pest are constrained within one and the same indication. That distinction, the
 * numeric conditions on waiting periods, and the exclusions cannot be expressed against a
 * flattened index, so the criteria are compiled into a query and sent to LINDAS.
 */
@Component({
	selector: 'app-advanced-query',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatTooltipModule,
		ObAlertModule,
		ProductCardComponent,
		TermDropdownComponent,
		TranslatePipe
	],
	templateUrl: './advanced-query.html',
	styleUrl: './advanced-query.scss'
})
export class AdvancedQueryPage {
	readonly registry = inject(RegistryService);
	private readonly sparql = inject(SparqlService);
	private readonly translate = inject(TranslateService);
	private readonly notification = inject(ObNotificationService);

	readonly criteria = signal<AdvancedCriteria>(EMPTY_CRITERIA);
	readonly running = signal(false);
	readonly error = signal<string | undefined>(undefined);
	readonly results = signal<Product[] | undefined>(undefined);
	readonly showQuery = signal(false);

	readonly query = computed(() => buildAdvancedQuery(this.criteria(), id => this.registry.aliases(id)));
	readonly guiLink = computed(() => this.sparql.guiLink(this.query()));

	/**
	 * The values each criterion can still take, with the number of products behind each.
	 *
	 * Choosing from these cannot narrow a question to nothing, which a free choice out of
	 * 1466 obligations very easily does. A criterion whose values must all hold is counted
	 * over the products that satisfy *everything*, itself included, so a number says what
	 * would be left once that value is added. The rest are counted as if they were unset:
	 * an alternative widens rather than narrows, a single choice replaces the one before,
	 * and an exclusion needs to see what it could exclude.
	 */
	private readonly reachable = computed(() => {
		const criteria = this.criteria();
		const products = this.registry.products();
		const counts = {} as Record<TermCriterion, Map<string, number>>;
		for (const criterion of TERM_CRITERIA) {
			const narrows =
				isCombinable(criterion) && !isExclusion(criterion) && criteria.combinations[criterion] === 'and';
			const tally = new Map<string, number>();
			for (const product of products) {
				if (!matchesCriteria(product, criteria, narrows ? undefined : criterion)) {
					continue;
				}
				for (const value of valuesFor(product, criterion, criteria)) {
					tally.set(value, (tally.get(value) ?? 0) + 1);
				}
			}
			counts[criterion] = tally;
		}
		return counts;
	});

	readonly cropOptions = computed(() => this.optionsFor('crops', this.registry.crops()));
	readonly pestOptions = computed(() => this.optionsFor('pests', this.registry.pests()));
	readonly areaOptions = computed(() => this.optionsFor('applicationAreas', this.registry.applicationAreas()));
	readonly typeOptions = computed(() => this.optionsFor('productTypes', this.registry.productTypes()));
	readonly substanceOptions = computed(() => this.optionsFor('substances', this.registry.substances()));
	readonly labelOptions = computed(() => this.optionsFor('labelElements', this.registry.labelElements()));
	readonly obligationOptions = computed(() => this.optionsFor('obligations', this.registry.obligations()));
	readonly formulationOptions = computed(() => this.optionsFor('formulations', this.registry.formulations()));
	readonly holderOptions = computed(() => this.optionsFor('holders', this.registry.holders()));
	readonly kindOptions = computed(() => this.optionsFor('kinds', this.kindTerms()));
	readonly countryOptions = computed(() => this.optionsFor('countries', this.registry.countries()));
	readonly excludedLabelOptions = computed(() => this.optionsFor('excludedLabelElements', this.registry.labelElements()));
	readonly excludedSubstanceOptions = computed(() =>
		this.optionsFor('excludedSubstances', this.registry.substances())
	);
	readonly excludedObligationOptions = computed(() =>
		this.optionsFor('excludedObligations', this.registry.obligations())
	);

	/** Effects and waiting periods are not in the local index, so their options carry no counts. */
	readonly effectOptions = computed<Term[]>(() => {
		// Product type labels are recomputed on every language change; reading them ties these to it too.
		this.registry.productTypes();
		return EFFECTS.map(effect => ({id: effect, label: this.translate.instant(`product.effect.${effect}`) as string}));
	});

	readonly waitingPeriodOptions = computed<Term[]>(() => {
		// As above: recomputed when the language changes.
		this.registry.productTypes();
		return WAITING_PERIODS.map(days => ({
			id: String(days),
			label: this.translate.instant('query.atMostDays', {count: days}) as string
		}));
	});

	readonly waitingPeriodSelection = computed(() => {
		const days = this.criteria().maxWaitingPeriodDays;
		return days === undefined ? [] : [String(days)];
	});

	update<Key extends keyof AdvancedCriteria>(key: Key, value: AdvancedCriteria[Key]): void {
		this.criteria.update(criteria => ({...criteria, [key]: value}));
	}

	/** Narrows the identifiers the checkbox list emits back to the admission kinds. */
	updateKinds(ids: string[]): void {
		this.update('kinds', ids.filter((id): id is ProductKind => (KINDS as string[]).includes(id)));
	}

	updateEffects(ids: string[]): void {
		this.update('effects', ids.filter((id): id is Effect => (EFFECTS as string[]).includes(id)));
	}

	updateWaitingPeriod(ids: string[]): void {
		this.update('maxWaitingPeriodDays', ids.length ? Number(ids[0]) : undefined);
	}

	updateCombination(criterion: CombinableCriterion, combination: Combination | undefined): void {
		if (combination) {
			this.update('combinations', {...this.criteria().combinations, [criterion]: combination});
		}
	}

	reset(): void {
		this.criteria.set(EMPTY_CRITERIA);
		this.results.set(undefined);
		this.error.set(undefined);
	}

	/** Runs whatever the form holds; with no criteria at all that is the whole registry. */
	run(): void {
		if (this.running()) {
			return;
		}
		this.running.set(true);
		this.error.set(undefined);
		this.sparql
			.query(this.query())
			.pipe(
				catchError((error: Error) => {
					this.error.set(error.message);
					return of([]);
				})
			)
			.subscribe(rows => {
				this.running.set(false);
				const products = this.registry.productsById();
				this.results.set(
					rows
						.map(row => products.get(row['id']))
						.filter((product): product is Product => !!product)
						.sort((left, right) => left.name.localeCompare(right.name))
				);
			});
	}

	async copyQuery(): Promise<void> {
		await navigator.clipboard.writeText(this.query());
		this.notification.success('common.copied');
	}

	/** Labels and sorts the reachable values of one criterion, keeping what is chosen. */
	private optionsFor(criterion: TermCriterion, labels: Map<string, Term>): Term[] {
		const counts = this.reachable()[criterion];
		const ids = new Set([...counts.keys(), ...this.criteria()[criterion]]);
		return [...ids]
			.map(id => ({...(labels.get(id) ?? {id, label: id}), count: counts.get(id) ?? 0}))
			.sort((left, right) => left.label.localeCompare(right.label));
	}

	private kindTerms(): Map<string, Term> {
		return new Map(KINDS.map(kind => [kind as string, {id: kind, label: this.translate.instant(`kind.${kind}`) as string}]));
	}

}
