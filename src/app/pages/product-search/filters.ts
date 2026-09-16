import {Params} from '@angular/router';
import {admissionStatus} from '../../core/format';
import {Product, ProductUse} from '../../core/models';

/** Every facet the search page can constrain, plus the free-text query. */
export interface Filters {
	text: string;
	crops: string[];
	pests: string[];
	holders: string[];
	substances: string[];
	statuses: string[];
}

/**
 * The facets of the search page, in the order it shows them.
 *
 * These five are the questions people arrive with: what am I growing, what is attacking it,
 * whose product is it, what is in it, and may it still be used. Everything else the
 * registry can be asked — product type, application area, labelling, obligations,
 * formulation, admission type, country of production — is a specialist's question and
 * lives on the advanced query page.
 */
export const LIST_FACETS = ['crops', 'pests', 'holders', 'substances', 'statuses'] as const;

export type ListFacet = (typeof LIST_FACETS)[number];

/**
 * The facets that take one value at a time rather than a list.
 *
 * Every filter narrows, so two values of the same facet have to hold at once. A product
 * has exactly one admission status and exactly one permission holder, so a second choice
 * in either of these could only answer nothing. They are offered as a single choice, which
 * also means that picking a value *replaces* the one before it — so their option counts
 * are the only ones computed as if the facet were not set.
 */
export const SINGLE_FACETS: readonly ListFacet[] = ['holders', 'statuses'];

/** The facets matched against the product as a whole, one value at a time. */
const PLAIN_FACETS = ['holders', 'substances', 'statuses'] as const;

type PlainFacet = (typeof PLAIN_FACETS)[number];

export const EMPTY_FILTERS: Filters = {
	text: '',
	crops: [],
	pests: [],
	holders: [],
	substances: [],
	statuses: []
};

export function countActive(filters: Filters): number {
	return LIST_FACETS.reduce((total, facet) => total + filters[facet].length, 0) + (filters.text ? 1 : 0);
}

/** The values a product carries for a facet that is read off the product itself. */
function valuesOf(product: Product, facet: PlainFacet): readonly string[] {
	switch (facet) {
		case 'holders':
			return product.holder ? [product.holder] : [];
		case 'substances':
			return product.substances;
		case 'statuses':
			return [admissionStatus(product)];
	}
}

/**
 * Whether a product satisfies the crop and the pest filter together.
 *
 * The two are one question, not two: a crop and a pest have to meet in the *same* admitted
 * use, or the answer would include a product registered against mildew in wheat for a
 * grower asking about mildew in vines that the product only treats for something else.
 * Several crops and several pests are asked pairwise — each crop with each pest — because
 * "wheat and barley against mildew" is answered by two indications, one per crop, and
 * hardly ever by a single one naming both.
 */
function matchesUses(product: Product, crops: string[], pests: string[]): boolean {
	if (!crops.length && !pests.length) {
		return true;
	}
	if (!crops.length) {
		return pests.every(pest => product.uses.some(use => use.pests.includes(pest)));
	}
	if (!pests.length) {
		return crops.every(crop => product.uses.some(use => use.crops.includes(crop)));
	}
	return crops.every(crop =>
		pests.every(pest => product.uses.some(use => use.crops.includes(crop) && use.pests.includes(pest)))
	);
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

/**
 * Whether a product answers the whole question, optionally ignoring one facet.
 *
 * Every facet narrows: a second crop is another condition the product has to meet, not
 * another crop that would do. `except` is there for the two single-choice facets, whose
 * options are counted as if nothing were chosen in them, because choosing one replaces
 * whatever was chosen before.
 */
export function matchesAll(product: Product, filters: Filters, except?: ListFacet): boolean {
	if (!matchesText(product, filters.text)) {
		return false;
	}
	for (const facet of PLAIN_FACETS) {
		if (facet === except) {
			continue;
		}
		const values = valuesOf(product, facet);
		if (!filters[facet].every(value => values.includes(value))) {
			return false;
		}
	}
	return matchesUses(product, except === 'crops' ? [] : filters.crops, except === 'pests' ? [] : filters.pests);
}

/**
 * The values of one facet that a matching product would still answer for.
 *
 * Counting these over the products that match *everything* is what makes the option lists
 * honest under conjunctive filters: an option's number is how many products are left once
 * it is added, so an option that would empty the result is never offered. For crop and
 * pest that means reading the two together again — with a pest chosen, only the crops it
 * is fought in are worth offering.
 */
export function candidateValues(product: Product, facet: ListFacet, filters: Filters): readonly string[] {
	switch (facet) {
		case 'crops':
			return intersect(filters.pests, pest => usesAgainst(product, pest).flatMap(use => use.crops));
		case 'pests':
			return intersect(filters.crops, crop => usesOn(product, crop).flatMap(use => use.pests));
		default:
			return valuesOf(product, facet);
	}
}

function usesOn(product: Product, crop: string): ProductUse[] {
	return crop ? product.uses.filter(use => use.crops.includes(crop)) : product.uses;
}

function usesAgainst(product: Product, pest: string): ProductUse[] {
	return pest ? product.uses.filter(use => use.pests.includes(pest)) : product.uses;
}

/** The values reachable through every one of `keys`, or through all uses when there is none. */
function intersect(keys: string[], valuesOfKey: (key: string) => string[]): string[] {
	let shared: Set<string> | undefined;
	for (const key of keys.length ? keys : ['']) {
		const values = new Set(valuesOfKey(key));
		shared = shared ? new Set([...shared].filter(value => values.has(value))) : values;
	}
	return [...(shared ?? [])];
}

export type SortKey = 'relevance' | 'name' | 'number' | 'holder';

/** How a result list is shown: as a grid of cards, or as a table to compare across. */
export type ResultView = 'cards' | 'table';

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
export function toParams(filters: Filters, sort: SortKey, page: number, view: ResultView = 'cards'): Params {
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
	if (view !== 'cards') {
		params['view'] = view;
	}
	return params;
}

export function fromParams(params: Params): {filters: Filters; sort: SortKey; page: number; view: ResultView} {
	const read = (key: string): string[] => (typeof params[key] === 'string' && params[key] ? params[key].split('~') : []);
	const filters: Filters = {...EMPTY_FILTERS, text: typeof params['q'] === 'string' ? params['q'] : ''};
	for (const facet of LIST_FACETS) {
		filters[facet] = read(facet);
	}
	const sort = (['name', 'number', 'holder', 'relevance'] as SortKey[]).find(key => key === params['sort']) ?? 'relevance';
	const page = Math.max(0, Number(params['page'] ?? 1) - 1) || 0;
	const view: ResultView = params['view'] === 'table' ? 'table' : 'cards';
	return {filters, sort, page, view};
}
