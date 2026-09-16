import {ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ObAlertModule, ObPaginatorService} from '@oblique/oblique';
import {fullTermLabel, shortTermLabel} from '../../core/format';
import {Product, Term} from '../../core/models';
import {RegistryService} from '../../core/registry.service';
import {ProductCardComponent} from '../../shared/product-card';
import {ProductTableComponent} from '../../shared/product-table';
import {
	EMPTY_FILTERS,
	Filters,
	LIST_FACETS,
	ListFacet,
	ResultView,
	SINGLE_FACETS,
	SortKey,
	candidateValues,
	compareProducts,
	countActive,
	fromParams,
	matchesAll,
	toParams
} from './filters';
import {TermDropdownComponent} from '../../shared/term-dropdown';

const PAGE_SIZES = [12, 24, 48, 96];
const DEFAULT_PAGE_SIZE = 12;

/**
 * The search page: a free-text field, a facet panel, and a paginated grid of products.
 *
 * All filtering happens against the in-memory index, so every keystroke and every choice
 * re-ranks 2363 products without a network round trip. Every filter narrows: a second
 * crop is another condition the product has to meet, not another crop that would do. The
 * facet options follow from that — each one is counted as the result it would leave
 * behind, so the panel only ever offers a value that still has products behind it.
 */
@Component({
	selector: 'app-product-search',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatSelectModule,
		MatTooltipModule,
		ObAlertModule,
		RouterLink,
		ProductCardComponent,
		ProductTableComponent,
		TermDropdownComponent,
		TranslatePipe
	],
	providers: [{provide: MatPaginatorIntl, useClass: ObPaginatorService}],
	templateUrl: './product-search.html',
	styleUrl: './product-search.scss'
})
export class ProductSearchPage {
	readonly registry = inject(RegistryService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly translate = inject(TranslateService);

	readonly pageSizes = PAGE_SIZES;
	readonly sortKeys: SortKey[] = ['relevance', 'name', 'number', 'holder'];

	readonly filters = signal<Filters>(EMPTY_FILTERS);
	readonly sort = signal<SortKey>('relevance');
	readonly page = signal(0);
	readonly pageSize = signal(DEFAULT_PAGE_SIZE);
	readonly view = signal<ResultView>('cards');
	/** The panel sits beside the results on wide screens and folds away on narrow ones. */
	readonly panelOpen = signal(typeof window === 'undefined' || window.matchMedia('(min-width: 1100px)').matches);

	readonly activeCount = computed(() => countActive(this.filters()));

	readonly matching = computed(() => {
		const filters = this.filters();
		const products = this.registry.products().filter(product => matchesAll(product, filters));
		return products.sort((left, right) => compareProducts(left, right, this.sort(), filters.text));
	});

	readonly pageProducts = computed(() => {
		const start = this.page() * this.pageSize();
		return this.matching().slice(start, start + this.pageSize());
	});

	/**
	 * Options of every facet, each counted as the result it would leave behind.
	 *
	 * The filters narrow one another, so an option's number is how many products remain
	 * once it is added to everything already chosen — which keeps a question from being
	 * narrowed to nothing one field at a time. The two single-choice facets are the
	 * exception: a choice there replaces the one before it, so they are counted as if the
	 * facet were not set, and every value stays reachable.
	 */
	readonly facetOptions = computed(() => {
		const filters = this.filters();
		const products = this.registry.products();
		const options = {} as Record<ListFacet, Term[]>;
		const counts = new Map<ListFacet, Map<string, number>>(LIST_FACETS.map(facet => [facet, new Map()]));
		const count = (facet: ListFacet, product: Product): void => {
			const values = counts.get(facet)!;
			for (const value of candidateValues(product, facet, filters)) {
				values.set(value, (values.get(value) ?? 0) + 1);
			}
		};
		for (const product of products) {
			if (matchesAll(product, filters)) {
				for (const facet of LIST_FACETS) {
					count(facet, product);
				}
			} else {
				for (const facet of SINGLE_FACETS) {
					if (matchesAll(product, filters, facet)) {
						count(facet, product);
					}
				}
			}
		}
		for (const facet of LIST_FACETS) {
			options[facet] = this.decorate(facet, counts.get(facet)!, filters[facet]);
		}
		return options;
	});

	/** The current selection as one flat list, so it can be shown and undone as badges. */
	readonly activeBadges = computed(() => {
		const filters = this.filters();
		const options = this.facetOptions();
		const badges: {facet: ListFacet; id: string; label: string; fullLabel: string; facetLabel: string}[] = [];
		for (const facet of LIST_FACETS) {
			for (const id of filters[facet]) {
				const term = options[facet].find(option => option.id === id) ?? {id, label: id};
				badges.push({
					facet,
					id,
					label: shortTermLabel(term, 34),
					fullLabel: fullTermLabel(term),
					facetLabel: this.translate.instant(FACET_LABELS[facet]) as string
				});
			}
		}
		return badges;
	});

	constructor() {
		const state = fromParams(this.route.snapshot.queryParams);
		this.filters.set(state.filters);
		this.sort.set(state.sort);
		this.page.set(state.page);
		this.view.set(state.view);

		// The URL mirrors the state so that a result list can be bookmarked and shared.
		effect(() => {
			const params = toParams(this.filters(), this.sort(), this.page(), this.view());
			untracked(() =>
				void this.router.navigate([], {relativeTo: this.route, queryParams: params, replaceUrl: true})
			);
		});
	}

	setText(text: string): void {
		this.filters.update(filters => ({...filters, text}));
		this.page.set(0);
	}

	setFacet(facet: ListFacet, ids: string[]): void {
		this.filters.update(filters => ({...filters, [facet]: ids}));
		this.page.set(0);
	}

	toggleValue(facet: ListFacet, id: string, checked: boolean): void {
		const current = this.filters()[facet];
		this.setFacet(facet, checked ? [...current, id] : current.filter(value => value !== id));
	}

	removeBadge(facet: ListFacet, id: string): void {
		this.toggleValue(facet, id, false);
	}

	reset(): void {
		this.filters.set(EMPTY_FILTERS);
		this.sort.set('relevance');
		this.page.set(0);
	}

	onPage(event: PageEvent): void {
		this.page.set(event.pageIndex);
		this.pageSize.set(event.pageSize);
	}

	trackProduct(_index: number, product: Product): string {
		return product.id;
	}

	/** Turns counted identifiers into labelled, sorted options for one facet. */
	private decorate(facet: ListFacet, counts: Map<string, number>, selected: string[]): Term[] {
		const labels = this.labelSource(facet);
		const ids = new Set([...counts.keys(), ...selected]);
		const options = [...ids].map(id => {
			const term = labels?.get(id);
			return {
				id,
				label: term?.label ?? this.fallbackLabel(facet, id),
				code: term?.code,
				count: counts.get(id) ?? 0
			};
		});
		return options.sort((left, right) => (right.count ?? 0) - (left.count ?? 0) || left.label.localeCompare(right.label));
	}

	private labelSource(facet: ListFacet): Map<string, Term> | undefined {
		switch (facet) {
			case 'crops':
				return this.registry.crops();
			case 'pests':
				return this.registry.pests();
			case 'holders':
				return this.registry.holders();
			case 'substances':
				return this.registry.substances();
			case 'statuses':
				return undefined;
		}
	}

	/** The admission status is derived rather than a code list, so it is named here. */
	private fallbackLabel(facet: ListFacet, id: string): string {
		return facet === 'statuses' ? (this.translate.instant(`status.${id}`) as string) : id;
	}
}

const FACET_LABELS: Record<ListFacet, string> = {
	crops: 'filter.crop',
	pests: 'filter.pest',
	holders: 'filter.holder',
	substances: 'filter.substance',
	statuses: 'filter.status'
};
