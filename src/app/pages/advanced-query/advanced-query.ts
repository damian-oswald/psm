import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ObAlertModule, ObNotificationService} from '@oblique/oblique';
import {catchError, of} from 'rxjs';
import {AdvancedCriteria, EMPTY_CRITERIA, Effect, buildAdvancedQuery, isEmpty} from '../../core/advanced-query';
import {RegistryService} from '../../core/registry.service';
import {SparqlService} from '../../core/sparql.service';
import {Product, ProductKind, Term} from '../../core/models';
import {ProductCardComponent} from '../../shared/product-card';
import {TermMultiSelectComponent} from '../../shared/term-multi-select';
import {TermSelectComponent} from '../../shared/term-select';
import {TERM_CRITERIA, TermCriterion, matchesCriteria, valuesFor} from './criteria-match';

const KINDS: ProductKind[] = ['RegularProduct', 'SalePermission', 'ParallelImport'];
const EFFECTS: Effect[] = ['full', 'partial', 'side'];

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
		FormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTooltipModule,
		ObAlertModule,
		ProductCardComponent,
		TermMultiSelectComponent,
		TermSelectComponent,
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

	readonly effects = EFFECTS;

	readonly criteria = signal<AdvancedCriteria>(EMPTY_CRITERIA);
	readonly running = signal(false);
	readonly error = signal<string | undefined>(undefined);
	readonly results = signal<Product[] | undefined>(undefined);
	readonly showQuery = signal(false);

	readonly query = computed(() => buildAdvancedQuery(this.criteria(), id => this.registry.aliases(id)));
	readonly runnable = computed(() => !isEmpty(this.criteria()));
	readonly guiLink = computed(() => this.sparql.guiLink(this.query()));

	/**
	 * The values each criterion can still take, counted over the products that satisfy all
	 * the *other* criteria. Choosing from these cannot narrow a question to nothing, which
	 * a free choice out of 1466 obligations very easily does.
	 */
	private readonly reachable = computed(() => {
		const criteria = this.criteria();
		const products = this.registry.products();
		const counts = {} as Record<TermCriterion, Map<string, number>>;
		for (const criterion of TERM_CRITERIA) {
			const tally = new Map<string, number>();
			for (const product of products) {
				if (!matchesCriteria(product, criteria, criterion)) {
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

	update<Key extends keyof AdvancedCriteria>(key: Key, value: AdvancedCriteria[Key]): void {
		this.criteria.update(criteria => ({...criteria, [key]: value}));
	}

	/** Narrows the identifiers the checkbox list emits back to the admission kinds. */
	updateKinds(ids: string[]): void {
		this.update('kinds', ids.filter((id): id is ProductKind => (KINDS as string[]).includes(id)));
	}

	updateWaitingPeriod(value: string): void {
		const parsed = Number(value);
		this.update('maxWaitingPeriodDays', value.trim() && Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined);
	}

	toggleEffect(effect: Effect, checked: boolean): void {
		const current = this.criteria().effects;
		this.update('effects', checked ? [...current, effect] : current.filter(other => other !== effect));
	}

	reset(): void {
		this.criteria.set(EMPTY_CRITERIA);
		this.results.set(undefined);
		this.error.set(undefined);
	}

	run(): void {
		if (!this.runnable()) {
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
