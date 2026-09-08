import {Params} from '@angular/router';
import {admissionStatus} from '../../core/format';
import {Product} from '../../core/models';

/** Every facet the search page can constrain, plus the free-text query. */
export interface Filters {
	text: string;
	crops: string[];
	pests: string[];
	holders: string[];
	substances: string[];
	types: string[];
	statuses: string[];
}

/**
 * The facets of the search page, in the order it shows them.
 *
 * These six are the questions people arrive with: what am I growing, what is attacking it,
 * whose product is it, what is in it, what kind of product is it, and may it still be
 * used. Everything else the registry can be asked — application area, labelling,
 * obligations, formulation, admission type, country of production — is a specialist's
 * question and lives on the advanced query page.
 */
export const LIST_FACETS = ['crops', 'pests', 'holders', 'substances', 'types', 'statuses'] as const;

export type ListFacet = (typeof LIST_FACETS)[number];

export const EMPTY_FILTERS: Filters = {
	text: '',
	crops: [],
	pests: [],
	holders: [],
	substances: [],
	types: [],
	statuses: []
};

export function countActive(filters: Filters): number {
	return LIST_FACETS.reduce((total, facet) => total + filters[facet].length, 0) + (filters.text ? 1 : 0);
}

/**
 * The values a product contributes to a facet, used both for matching and for counting.
 *
 * A crop contributes the crops above it in the hierarchy as well, so that asking for
 * `Getreide` finds the products admitted for `Winterweizen`. The advanced query page can
 * turn that off; here it is always on, because it is what a plain crop filter should mean.
 */
export function valuesOf(product: Product, facet: ListFacet): readonly string[] {
	switch (facet) {
		case 'crops':
			return product.cropsWithParents;
		case 'pests':
			return product.pests;
		case 'holders':
			return product.holder ? [product.holder] : [];
		case 'substances':
			return product.substances;
		case 'types':
			return product.types;
		case 'statuses':
			return [admissionStatus(product)];
	}
}

/**
 * Whether a product satisfies one facet.
 *
 * Within a facet the selected values are alternatives, because "Herbicide or Fungicide"
 * is the question people ask; across facets they are conditions, all of which must hold.
 */
export function matchesFacet(product: Product, facet: ListFacet, filters: Filters): boolean {
	const selected = filters[facet];
	if (!selected.length) {
		return true;
	}
	const values = valuesOf(product, facet);
	return selected.some(value => values.includes(value));
}

export function matchesText(product: Product, text: string): boolean {
	if (!text) {
		return true;
	}
	return text
		.toLowerCase()
		.split(/\s+/u)
		.every(word => product.haystack.includes(word));
}

export function matchesAll(product: Product, filters: Filters, except?: ListFacet): boolean {
	if (!matchesText(product, filters.text)) {
		return false;
	}
	return LIST_FACETS.every(facet => facet === except || matchesFacet(product, facet, filters));
}

export type SortKey = 'relevance' | 'name' | 'number' | 'holder';

export function compareProducts(left: Product, right: Product, sort: SortKey, text: string): number {
	switch (sort) {
		case 'name':
			return left.name.localeCompare(right.name);
		case 'number':
			return left.admissionNumber.localeCompare(right.admissionNumber, undefined, {numeric: true});
		case 'holder':
			return (left.holderName ?? '').localeCompare(right.holderName ?? '') || left.name.localeCompare(right.name);
		case 'relevance':
			return relevance(right, text) - relevance(left, text) || left.name.localeCompare(right.name);
	}
}

/** Ranks an exact name, then a name prefix, then a name hit, above a hit anywhere else. */
function relevance(product: Product, text: string): number {
	if (!text) {
		return 0;
	}
	const needle = text.toLowerCase();
	const name = product.name.toLowerCase();
	if (name === needle || product.admissionNumber.toLowerCase() === needle) {
		return 4;
	}
	if (name.startsWith(needle)) {
		return 3;
	}
	if (name.includes(needle)) {
		return 2;
	}
	return 1;
}

/** Serialises the filters into query parameters so that a result can be shared as a link. */
export function toParams(filters: Filters, sort: SortKey, page: number): Params {
	const params: Params = {};
	if (filters.text) {
		params['q'] = filters.text;
	}
	for (const facet of LIST_FACETS) {
		if (filters[facet].length) {
			params[facet] = filters[facet].join('~');
		}
	}
	if (sort !== 'relevance') {
		params['sort'] = sort;
	}
	if (page > 0) {
		params['page'] = String(page + 1);
	}
	return params;
}

export function fromParams(params: Params): {filters: Filters; sort: SortKey; page: number} {
	const read = (key: string): string[] => (typeof params[key] === 'string' && params[key] ? params[key].split('~') : []);
	const filters: Filters = {...EMPTY_FILTERS, text: typeof params['q'] === 'string' ? params['q'] : ''};
	for (const facet of LIST_FACETS) {
		filters[facet] = read(facet);
	}
	const sort = (['name', 'number', 'holder', 'relevance'] as SortKey[]).find(key => key === params['sort']) ?? 'relevance';
	const page = Math.max(0, Number(params['page'] ?? 1) - 1) || 0;
	return {filters, sort, page};
}
