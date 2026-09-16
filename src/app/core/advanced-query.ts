import {GRAPH, ProductKind} from './models';

/** Which effect a product must have on the selected pests. */
export type Effect = 'full' | 'partial' | 'side';

/**
 * A structured question about the registry.
 *
 * Every field except the numeric ones holds identifiers of *things* — crops, pests,
 * hazard statements, obligations — never free text, which is what makes the question
 * translatable into a SPARQL query with no string matching at all.
 */
export interface AdvancedCriteria {
	crops: string[];
	/** Also match indications for crops below the selected one in the crop hierarchy. */
	includeSubCrops: boolean;
	pests: string[];
	/** Empty means any effect, including indications that only state `:pest`. */
	effects: Effect[];
	/** Require crop and pest to meet in one and the same indication. */
	sameIndication: boolean;
	applicationAreas: string[];
	obligations: string[];
	excludedObligations: string[];
	productTypes: string[];
	formulations: string[];
	substances: string[];
	excludedSubstances: string[];
	labelElements: string[];
	excludedLabelElements: string[];
	countries: string[];
	holders: string[];
	kinds: ProductKind[];
	/** Upper bound on the waiting period of the matching indication, in days. */
	maxWaitingPeriodDays?: number;
	/** Let sale permissions and parallel imports inherit their reference product's uses. */
	includeInherited: boolean;
	/** Drop products whose admission has been revoked and that only run out a stock. */
	onlyWithoutDeadline: boolean;
	limit: number;
}

export const EMPTY_CRITERIA: AdvancedCriteria = {
	crops: [],
	includeSubCrops: true,
	pests: [],
	effects: [],
	sameIndication: true,
	applicationAreas: [],
	obligations: [],
	excludedObligations: [],
	productTypes: [],
	formulations: [],
	substances: [],
	excludedSubstances: [],
	labelElements: [],
	excludedLabelElements: [],
	countries: [],
	holders: [],
	kinds: [],
	maxWaitingPeriodDays: undefined,
	includeInherited: true,
	onlyWithoutDeadline: false,
	limit: 500
};

/** True when the criteria would not constrain the result set at all. */
export function isEmpty(criteria: AdvancedCriteria): boolean {
	return (
		!criteria.crops.length &&
		!criteria.pests.length &&
		!criteria.applicationAreas.length &&
		!criteria.obligations.length &&
		!criteria.excludedObligations.length &&
		!criteria.productTypes.length &&
		!criteria.formulations.length &&
		!criteria.substances.length &&
		!criteria.excludedSubstances.length &&
		!criteria.labelElements.length &&
		!criteria.excludedLabelElements.length &&
		!criteria.countries.length &&
		!criteria.holders.length &&
		!criteria.kinds.length &&
		criteria.maxWaitingPeriodDays === undefined &&
		!criteria.onlyWithoutDeadline
	);
}

const NAMESPACE = 'https://agriculture.ld.admin.ch/plant-protection/';

/**
 * Every identifier that means what the given one means.
 *
 * A few concepts are described twice in the graph under different IRIs, and the interface
 * folds those onto one. A query built from a folded identifier has to name all of them
 * again, or it misses the products that reference the other one.
 */
export type Aliases = (id: string) => string[];

const ITSELF: Aliases = id => [id];

/**
 * Names a thing of the registry, as briefly as SPARQL allows.
 *
 * Classes and properties have plain local names, which read far better as prefixed names
 * — `:Acaricide` rather than the whole IRI. Code list terms are named `crop/1a2b-…`, and a
 * slash is not allowed in a prefixed name without escaping it, so those keep the full IRI.
 */
function iri(id: string): string {
	const safe = id.replace(/[^A-Za-z0-9._~/-]/gu, '');
	return /^[A-Za-z][A-Za-z0-9_-]*$/u.test(safe) ? `:${safe}` : `<${NAMESPACE}${safe}>`;
}

/** Renders identifiers such as `crop/1a2b` or `Acaricide` as a SPARQL `VALUES` list. */
function values(variable: string, ids: string[], aliases: Aliases): string {
	const iris = ids.flatMap(id => aliases(id)).map(iri).join(' ');
	return `VALUES ?${variable} { ${iris} }`;
}

/** A condition that the subject is linked to one of a concept's identifiers. */
function requires(subject: string, path: string, variable: string, id: string, aliases: Aliases): string[] {
	const expanded = aliases(id);
	if (expanded.length === 1) {
		return [`  ${subject} ${path} ${iri(expanded[0])} .`];
	}
	return [`  ${subject} ${path} ?${variable} .`, `  ${values(variable, [id], aliases)}`];
}

/** The negation of {@link requires}. */
function excludes(subject: string, path: string, variable: string, id: string, aliases: Aliases): string {
	const inner = requires(subject, path, variable, id, aliases)
		.map(line => line.trim())
		.join(' ')
		.replace(/ \.$/u, '');
	return `  FILTER NOT EXISTS { ${inner} }`;
}

/**
 * Translates {@link AdvancedCriteria} into a readable SPARQL query.
 *
 * The query is meant to be shown to the user next to its result, so it is formatted and
 * commented rather than minified: it doubles as documentation of what the filters mean,
 * and can be pasted into the LINDAS query editor unchanged.
 */
export function buildAdvancedQuery(criteria: AdvancedCriteria, aliases: Aliases = ITSELF): string {
	const lines: string[] = [];
	const indicationNeeded =
		criteria.crops.length > 0 ||
		criteria.pests.length > 0 ||
		criteria.applicationAreas.length > 0 ||
		criteria.obligations.length > 0 ||
		criteria.maxWaitingPeriodDays !== undefined;

	// The carrier of the indications: the product itself, or the product it references.
	const carrier = criteria.includeInherited ? '?carrier' : '?permission';
	if (indicationNeeded && criteria.includeInherited) {
		lines.push(
			'  # Sale permissions and parallel imports inherit the uses of their reference product.',
			'  ?permission :referenceProduct? ?carrier .'
		);
	}

	if (indicationNeeded) {
		const cropIndication = '?indication';
		const pestIndication = criteria.sameIndication ? '?indication' : '?pestIndication';

		if (criteria.crops.length) {
			const path = criteria.includeSubCrops ? ':crop/schema:isPartOf*' : ':crop';
			lines.push(
				criteria.includeSubCrops
					? '  # `schema:isPartOf*` walks up the crop hierarchy, so "Getreide" also matches "Winterweizen".'
					: '  # Only indications stated for exactly this crop.',
				`  ${cropIndication} :product ${carrier} ; ${path} ?crop .`,
				`  ${values('crop', criteria.crops, aliases)}`
			);
		}

		if (criteria.pests.length) {
			const effectPaths = criteria.effects.length
				? criteria.effects.map(effect => `:${effect}Effect`).join('|')
				: ':pest';
			lines.push(
				criteria.effects.length
					? `  # Restricted to ${criteria.effects.join(', ')} effect; the effect properties refine :pest.`
					: '  # Any recorded effect on the pest.',
				`  ${pestIndication} :product ${carrier} ; ${effectPaths} ?pest .`,
				`  ${values('pest', criteria.pests, aliases)}`
			);
		}

		if (!criteria.crops.length && !criteria.pests.length) {
			lines.push(`  ?indication :product ${carrier} .`);
		}

		if (criteria.applicationAreas.length) {
			lines.push(
				'  ?indication :applicationArea ?applicationArea .',
				`  ${values('applicationArea', criteria.applicationAreas, aliases)}`
			);
		}

		for (const [index, obligation] of criteria.obligations.entries()) {
			lines.push(...requires('?indication', ':obligation', `obligation${index}`, obligation, aliases));
		}

		if (criteria.maxWaitingPeriodDays !== undefined) {
			lines.push(
				'  # Waiting periods are recorded in days or in weeks; both are compared in days.',
				'  OPTIONAL {',
				'    ?indication :waitingPeriod ?waitingPeriod .',
				'    OPTIONAL { ?waitingPeriod schema:value ?waitingValue }',
				'    OPTIONAL { ?waitingPeriod schema:maxValue ?waitingMax }',
				'    OPTIONAL { ?waitingPeriod schema:unitCode ?waitingUnit }',
				'    BIND(IF(STRENDS(STR(?waitingUnit), "WK"), 7, 1) AS ?daysPerUnit)',
				'    BIND(COALESCE(?waitingMax, ?waitingValue) * ?daysPerUnit AS ?waitingDays)',
				'  }',
				`  FILTER(!BOUND(?waitingDays) || ?waitingDays <= ${Math.max(0, Math.round(criteria.maxWaitingPeriodDays))})`
			);
		}

		for (const [index, obligation] of criteria.excludedObligations.entries()) {
			lines.push(excludes('?indication', ':obligation', `withoutObligation${index}`, obligation, aliases));
		}
	}

	if (criteria.productTypes.length) {
		lines.push(
			'  ?permission :productType ?productType .',
			`  ${values('productType', criteria.productTypes, ITSELF)}`
		);
	}
	if (criteria.formulations.length) {
		lines.push('  ?permission :formulation ?formulation .', `  ${values('formulation', criteria.formulations, aliases)}`);
	}
	if (criteria.countries.length) {
		const countries = criteria.countries.map(id => `country:${id.replace(/[^A-Z]/gu, '')}`).join(' ');
		lines.push('  ?permission schema:countryOfOrigin ?country .', `  VALUES ?country { ${countries} }`);
	}
	if (criteria.holders.length) {
		lines.push(
			'  ?permission :permissionHolder ?holder .',
			`  VALUES ?holder { ${criteria.holders.map(id => iri(`company/${id}`)).join(' ')} }`
		);
	}
	if (criteria.kinds.length) {
		lines.push(
			`  VALUES ?kind { ${criteria.kinds.map(kind => iri(kind.replace(/[^A-Za-z]/gu, ''))).join(' ')} }`,
			'  ?permission a ?kind .'
		);
	}

	// Substances and labelling elements are conjunctive: every selected one must be present.
	for (const [index, substance] of criteria.substances.entries()) {
		lines.push(...requires('?permission', ':ingredient/:substance', `substance${index}`, substance, aliases));
	}
	for (const [index, substance] of criteria.excludedSubstances.entries()) {
		lines.push(excludes('?permission', ':ingredient/:substance', `withoutSubstance${index}`, substance, aliases));
	}
	for (const [index, element] of criteria.labelElements.entries()) {
		lines.push(...requires('?permission', ':ghsLabel', `labelElement${index}`, element, aliases));
	}
	for (const [index, element] of criteria.excludedLabelElements.entries()) {
		lines.push(excludes('?permission', ':ghsLabel', `withoutLabelElement${index}`, element, aliases));
	}
	if (criteria.onlyWithoutDeadline) {
		lines.push(
			'  # Products with an exhaustion deadline have lost their admission and may only be used up.',
			'  FILTER NOT EXISTS { ?permission :exhaustionDeadline ?deadline }'
		);
	}

	return `PREFIX : <${NAMESPACE}>
PREFIX schema: <http://schema.org/>
PREFIX country: <https://ld.admin.ch/country/>

SELECT DISTINCT ?permission ?name ?id ?permissionHolder
FROM <${GRAPH}>
WHERE {
  ?permission a :Product ;
    schema:name ?name ;
    :federalAdmissionNumber ?id .
  # Optional, because a handful of products name no permission holder at all.
  OPTIONAL { ?permission :permissionHolder / schema:name ?permissionHolder }
${lines.join('\n')}
}
ORDER BY ?name`;
}
