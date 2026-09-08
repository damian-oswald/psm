import {Product} from '../../core/models';
import {AdvancedCriteria} from '../../core/advanced-query';

/** The criteria that name a term and therefore need a dropdown of reachable values. */
export const TERM_CRITERIA = [
	'crops',
	'pests',
	'applicationAreas',
	'productTypes',
	'substances',
	'labelElements',
	'obligations',
	'formulations',
	'holders',
	'kinds',
	'countries',
	'excludedLabelElements',
	'excludedSubstances',
	'excludedObligations'
] as const;

export type TermCriterion = (typeof TERM_CRITERIA)[number];

/** The values a product offers to one criterion. */
export function valuesFor(product: Product, criterion: TermCriterion, criteria: AdvancedCriteria): readonly string[] {
	// A product that borrows its uses from its reference product offers none of its own
	// when the query is told not to follow that link.
	const uses = criteria.includeInherited || !product.usesInherited;
	switch (criterion) {
		case 'crops':
			return uses ? (criteria.includeSubCrops ? product.cropsWithParents : product.crops) : [];
		case 'pests':
			return uses ? product.pests : [];
		case 'applicationAreas':
			return uses ? product.applicationAreas : [];
		case 'obligations':
		case 'excludedObligations':
			return uses ? product.obligations : [];
		case 'productTypes':
			return product.types;
		case 'substances':
		case 'excludedSubstances':
			return product.substances;
		case 'labelElements':
		case 'excludedLabelElements':
			return product.labelElements;
		case 'formulations':
			return product.formulations;
		case 'holders':
			return product.holder ? [product.holder] : [];
		case 'kinds':
			return [product.kind];
		case 'countries':
			return [product.country];
	}
}

/** True when the criterion excludes the products that carry its values rather than keeping them. */
function isExclusion(criterion: TermCriterion): boolean {
	return criterion.startsWith('excluded');
}

/**
 * Whether a product can still satisfy the criteria, ignoring one of them.
 *
 * This is a product-level approximation of the query the page builds: it applies every
 * criterion that names a term, but not the refinements the endpoint alone can evaluate —
 * that crop and pest meet in the *same* indication, the kind of effect, and the waiting
 * period. It exists to keep the dropdowns honest about what is still reachable, so a
 * question is not narrowed to nothing one field at a time.
 */
export function matchesCriteria(product: Product, criteria: AdvancedCriteria, except?: TermCriterion): boolean {
	if (criteria.onlyWithoutDeadline && product.exhaustionDeadline) {
		return false;
	}
	for (const criterion of TERM_CRITERIA) {
		if (criterion === except) {
			continue;
		}
		const selected = criteria[criterion];
		if (!selected.length) {
			continue;
		}
		const values = valuesFor(product, criterion, criteria);
		if (isExclusion(criterion)) {
			// Every excluded term must be absent.
			if (selected.some(value => values.includes(value))) {
				return false;
			}
		} else if (criterion === 'substances' || criterion === 'labelElements' || criterion === 'obligations') {
			// These are conjunctive in the query: all of them must be present.
			if (!selected.every(value => values.includes(value))) {
				return false;
			}
		} else if (!selected.some(value => values.includes(value))) {
			return false;
		}
	}
	return true;
}
