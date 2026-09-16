import {Combination, GRAPH, ProductKind} from './models';

/** Which effect a product must have on the selected pests. */
export type Effect = 'full' | 'partial' | 'side';

/**
 * The criteria that take several values, and so need to be told how those combine.
 *
 * The others take one value at a time because a second one could never hold: a product
 * has one permission holder, one country of production and one admission kind, and an
 * indication states one effect on a pest and one waiting period.
 */
export const COMBINABLE_CRITERIA = [
	'crops',
	'pests',
	'applicationAreas',
	'obligations',
	'excludedObligations',
	'productTypes',
	'formulations',
	'substances',
	'excludedSubstances',
	'labelElements',
	'excludedLabelElements'
] as const;

export type CombinableCriterion = (typeof COMBINABLE_CRITERIA)[number];

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
	/** At most one; empty means any effect, including indications that only state `:pest`. */
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
	/** How the values of each multiple choice combine; see {@link buildAdvancedQuery}. */
	combinations: Record<CombinableCriterion, Combination>;
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
	combinations: {
		crops: 'and',
		pests: 'and',
		applicationAreas: 'and',
		obligations: 'and',
		excludedObligations: 'and',
		productTypes: 'and',
		formulations: 'and',
		substances: 'and',
		excludedSubstances: 'and',
		labelElements: 'and',
		excludedLabelElements: 'and'
	},
	maxWaitingPeriodDays: undefined,
	includeInherited: true,
	onlyWithoutDeadline: false,
	limit: 500
};

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
 * The kinds of thing the registry names under a slug of its own, each with a prefix.
 *
 * Taken from the graph itself: every IRI under the namespace is either a class or property
 * with a plain local name, or sits one slug deep — `crop/1a2b-…`, `product/W-6752`. The
 * 33 `shape/` IRIs describe the data model and are never part of a question.
 */
const SLUGS = ['code', 'company', 'crop', 'indication', 'pest', 'product', 'substance'] as const;

/**
 * A local name that SPARQL accepts after a prefix without escaping.
 *
 * Letters, digits — a leading one too, which UUIDs and `substance:1671` need — hyphens and
 * underscores, and dots anywhere but at the end. Every local name in the graph fits.
 */
const LOCAL_NAME = /^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_-])?$/u;

/**
 * Names a thing of the registry, as briefly as SPARQL allows.
 *
 * Classes and properties take the empty prefix, `:Acaricide`; everything under a slug takes
 * the slug's, `crop:1a2b-…`, `code:GHS09`. An identifier that fits neither — an unknown slug,
 * a character that would need escaping — keeps its full IRI, so the query stays correct.
 */
function iri(id: string): string {
	const safe = id.replace(/[^A-Za-z0-9._~/-]/gu, '');
	const slash = safe.indexOf('/');
	const slug = slash < 0 ? '' : safe.slice(0, slash);
	const local = slash < 0 ? safe : safe.slice(slash + 1);
	const knownSlug = slug === '' || (SLUGS as readonly string[]).includes(slug);
	return knownSlug && LOCAL_NAME.test(local) ? `${slug}:${local}` : `<${NAMESPACE}${safe}>`;
}

/** One object of a triple pattern: a term written out, or a variable and the terms it may take. */
interface Slot {
	object: string;
	values: Pattern[];
}

/**
 * Places already-rendered terms into a pattern, as directly as SPARQL allows.
 *
 * A single term is written into the pattern itself — `?permission :productType :Acaricide`.
 * Only a choice between several needs a variable with a `VALUES` list: an `or`, or one of
 * the few concepts the graph describes under two IRIs.
 */
function slot(variable: string, terms: string[]): Slot {
	return terms.length === 1
		? {object: terms[0], values: []}
		: {object: `?${variable}`, values: [{text: `VALUES ?${variable} { ${terms.join(' ')} }`}]};
}

/** The terms a group of identifiers stands for, every alias included, as IRIs. */
function termsOf(ids: string[], aliases: Aliases): string[] {
	return ids.flatMap(id => aliases(id)).map(iri);
}

/** A slot per group, numbering only the variables, so a written-out term costs no number. */
function slots(variable: string, parts: string[][]): Slot[] {
	const count = parts.filter(terms => terms.length > 1).length;
	let index = 0;
	return parts.map(terms => slot(numbered(variable, terms.length > 1 ? index++ : 0, count), terms));
}

/** The selection split into what has to hold together: each value alone, or all as one. */
function groups(ids: string[], combination: Combination): string[][] {
	if (!ids.length) {
		return [];
	}
	return combination === 'or' ? [ids] : ids.map(id => [id]);
}

/**
 * Numbers a variable only when there is more than one of it, so a simple query stays simple.
 *
 * A variable that already ends in a number — one numbered by its indication — is kept apart
 * from the second counter, so that `?obligation2_1` reads as indication 2, obligation 1.
 */
function numbered(variable: string, index: number, count: number): string {
	if (count <= 1) {
		return variable;
	}
	return `${variable}${/\d$/u.test(variable) ? '_' : ''}${index + 1}`;
}

/**
 * One condition of the query, before it is laid out as text.
 *
 * A triple names one object; {@link layout} gathers triples that share a subject, and objects
 * that share a predicate. Anything else — `VALUES`, `OPTIONAL`, `FILTER` — is text. A comment
 * goes on its own line directly above what it explains.
 */
type Pattern = {subject: string; predicate: string; object: string; comment?: string} | {text: string; comment?: string};

function triple(subject: string, predicate: string, object: string, comment?: string): Pattern {
	return {subject, predicate, object, comment};
}

/**
 * Requires `subject path` to reach the selected terms.
 *
 * With `and` every term needs a match of its own, so each must be present; with `or` they
 * share one variable whose `VALUES` list any of them satisfies.
 */
function requires(
	subject: string,
	path: string,
	variable: string,
	ids: string[],
	combination: Combination,
	aliases: Aliases
): Pattern[] {
	const objects = slots(variable, groups(ids, combination).map(group => termsOf(group, aliases)));
	return [
		...objects.map(object => triple(subject, path, object.object)),
		...objects.flatMap(object => object.values)
	];
}

/** True for anything but a single prefixed property: a sequence, an alternative, or a repetition. */
function isPath(path: string): boolean {
	return /[/|*+?^]/u.test(path);
}

/**
 * The negation of {@link requires}.
 *
 * With `or` a subject is dropped as soon as it reaches any of the terms; with `and` only
 * when it reaches all of them, so the patterns share one `FILTER NOT EXISTS`.
 */
function excludes(
	subject: string,
	path: string,
	variable: string,
	ids: string[],
	combination: Combination,
	aliases: Aliases
): Pattern {
	const inner = layout(requires(subject, path, variable, ids, combination, aliases), '')
		.map(line => line.trim())
		.join(' ')
		.replace(/ \.$/u, '');
	return {text: `FILTER NOT EXISTS { ${inner} }`};
}

/**
 * Lays patterns out as lines, the way Turtle would write them.
 *
 * Triples come first, one block per subject in the order subjects first appear: a line per
 * predicate joined by `;`, and the objects of one predicate joined by `,` —
 * `?permission :productType :Acaricide, :Fungicide`. Everything else follows in its own
 * order. Moving it behind the triples changes nothing here: `VALUES` and `FILTER` apply to
 * the whole group wherever they stand, and every `OPTIONAL` joins only on variables the
 * triples bind anyway.
 *
 * Objects after a property path are not joined. LINDAS evaluates an object list after a
 * path wrongly — two substances that occur together in 14 products come back as none — so
 * those repeat the path after a `;`, which it evaluates correctly.
 */
function layout(patterns: Pattern[], indent = '  '): string[] {
	const blocks = new Map<string, {predicate: string; objects: string[]; comments: string[]}[]>();
	const others: Pattern[] = [];
	for (const pattern of patterns) {
		if (!('subject' in pattern)) {
			others.push(pattern);
			continue;
		}
		let block = blocks.get(pattern.subject);
		if (!block) {
			block = [];
			blocks.set(pattern.subject, block);
		}
		const shared = isPath(pattern.predicate) ? undefined : block.find(entry => entry.predicate === pattern.predicate);
		const entry = shared ?? {predicate: pattern.predicate, objects: [], comments: []};
		if (!shared) {
			block.push(entry);
		}
		if (!entry.objects.includes(pattern.object)) {
			entry.objects.push(pattern.object);
		}
		if (pattern.comment) {
			entry.comments.push(pattern.comment);
		}
	}

	const lines: string[] = [];
	for (const [subject, entries] of blocks) {
		entries.forEach((entry, index) => {
			const prefix = index === 0 ? `${indent}${subject} ` : `${indent}  `;
			const end = index === entries.length - 1 ? ' .' : ' ;';
			lines.push(
				...entry.comments.map(comment => `${index === 0 ? indent : `${indent}  `}# ${comment}`),
				`${prefix}${entry.predicate} ${entry.objects.join(', ')}${end}`
			);
		});
	}
	for (const pattern of others) {
		if (!('text' in pattern)) {
			continue;
		}
		if (pattern.comment) {
			lines.push(`${indent}# ${pattern.comment}`);
		}
		lines.push(...pattern.text.split('\n').map(line => `${indent}${line}`));
	}
	return lines;
}

/** Every way of taking one group out of each dimension. */
function combine<T>(dimensions: T[][]): T[][] {
	return dimensions.reduce<T[][]>(
		(combos, dimension) => combos.flatMap(combo => dimension.map(item => [...combo, item])),
		[[]]
	);
}

const SCHEMA = 'http://schema.org/';
const COUNTRY = 'https://ld.admin.ch/country/';

/**
 * The prefix declarations a query needs, and no others.
 *
 * Read off the laid-out query rather than tracked while building it: a prefix counts as used
 * where its name and a colon stand at the start of a term, outside full IRIs, string
 * literals and comments — which is all the places this builder writes a prefixed name.
 */
function prefixesFor(body: string): string[] {
	const code = body
		.split('\n')
		.filter(line => !line.trim().startsWith('#'))
		.join('\n')
		.replace(/<[^>\s]*>/gu, ' ')
		.replace(/"[^"]*"/gu, ' ');
	const declared: [string, string][] = [
		['', NAMESPACE],
		...SLUGS.map((slug): [string, string] => [slug, `${NAMESPACE}${slug}/`]),
		['schema', SCHEMA],
		['country', COUNTRY]
	];
	return declared
		.filter(([name]) => new RegExp(`(?:^|[\\s,;{}()/|^!*])${name}:`, 'u').test(code))
		.map(([name, namespace]) => `PREFIX ${name}: <${namespace}>`);
}

/**
 * Translates {@link AdvancedCriteria} into a readable SPARQL query.
 *
 * The query is meant to be shown to the user next to its result, so it is formatted and
 * commented rather than minified: it doubles as documentation of what the filters mean,
 * and can be pasted into the LINDAS query editor unchanged.
 *
 * Crops, pests and application areas are what an indication is *for*, so their `and`
 * means one indication per combination: two crops and a pest ask for an indication for
 * the pest in the first crop and another for the pest in the second. Everything else an
 * indication carries — its obligations, their exclusion, the waiting period — applies to
 * each of those indications. Their `or` puts the alternatives into a single indication.
 */
export function buildAdvancedQuery(criteria: AdvancedCriteria, aliases: Aliases = ITSELF): string {
	const combinations = criteria.combinations;
	const patterns: Pattern[] = [
		triple('?permission', 'a', ':Product'),
		triple('?permission', 'schema:name', '?name'),
		triple('?permission', ':federalAdmissionNumber', '?id'),
		{
			text: 'OPTIONAL { ?permission :permissionHolder / schema:name ?permissionHolder }',
			comment: 'Optional, because a handful of products name no permission holder at all.'
		}
	];
	const indicationNeeded =
		criteria.crops.length > 0 ||
		criteria.pests.length > 0 ||
		criteria.applicationAreas.length > 0 ||
		criteria.obligations.length > 0 ||
		criteria.excludedObligations.length > 0 ||
		criteria.maxWaitingPeriodDays !== undefined;

	// The carrier of the indications: the product itself, or the product it references.
	const carrier = criteria.includeInherited ? '?carrier' : '?permission';
	if (indicationNeeded && criteria.includeInherited) {
		patterns.push(
			triple(
				'?permission',
				':referenceProduct?',
				'?carrier',
				'Sale permissions and parallel imports inherit the uses of their reference product.'
			)
		);
	}

	if (indicationNeeded) {
		const cropPath = criteria.includeSubCrops ? ':crop/schema:isPartOf*' : ':crop';
		const pestPath = criteria.effects.length ? criteria.effects.map(effect => `:${effect}Effect`).join('|') : ':pest';

		type Part = {variable: string; path: string; ids: string[]; comment?: string};
		const dimension = (
			variable: string,
			path: string,
			ids: string[],
			combination: Combination,
			comment?: string
		): Part[] => groups(ids, combination).map((group, index) => ({variable, path, ids: group, comment: index ? undefined : comment}));

		const crops = dimension(
			'crop',
			cropPath,
			criteria.crops,
			combinations.crops,
			criteria.includeSubCrops
				? '`schema:isPartOf*` walks up the crop hierarchy, so "Getreide" also matches "Winterweizen".'
				: 'Only indications stated for exactly this crop.'
		);
		const pests = dimension(
			'pest',
			pestPath,
			criteria.pests,
			combinations.pests,
			criteria.effects.length
				? `Restricted to ${criteria.effects.join(', ')} effect; the effect properties refine :pest.`
				: 'Any recorded effect on the pest.'
		);
		const areas = dimension('applicationArea', ':applicationArea', criteria.applicationAreas, combinations.applicationAreas);
		// Without the same-indication rule the pests are looked up in indications of their own.
		const shared = criteria.sameIndication ? [crops, pests, areas] : [crops, areas];
		const blocks = combine(shared.filter(parts => parts.length > 0));
		const pestBlocks = criteria.sameIndication ? [] : pests;
		// A part's comment explains it once, where it first appears.
		const explained = new Set<string>();
		const once = (comment?: string): string | undefined => {
			if (!comment || explained.has(comment)) {
				return undefined;
			}
			explained.add(comment);
			return comment;
		};

		const maxDays = Math.max(0, Math.round(criteria.maxWaitingPeriodDays ?? 0));
		for (const [index, parts] of blocks.entries()) {
			const suffix = blocks.length > 1 ? String(index + 1) : '';
			const indication = `?indication${suffix}`;
			patterns.push(
				triple(
					indication,
					':product',
					carrier,
					index === 0 && blocks.length > 1
						? 'Every combination of the values that must all hold needs an indication of its own.'
						: undefined
				)
			);
			for (const part of parts) {
				const object = slot(`${part.variable}${suffix}`, termsOf(part.ids, aliases));
				patterns.push(triple(indication, part.path, object.object, once(part.comment)), ...object.values);
			}
			if (criteria.obligations.length) {
				patterns.push(
					...requires(indication, ':obligation', `obligation${suffix}`, criteria.obligations, combinations.obligations, aliases)
				);
			}
			if (criteria.maxWaitingPeriodDays !== undefined) {
				const variable = (name: string): string => `?${name}${suffix}`;
				patterns.push(
					{
						text: [
							'OPTIONAL {',
							`  ${indication} :waitingPeriod ${variable('waitingPeriod')} .`,
							`  OPTIONAL { ${variable('waitingPeriod')} schema:value ${variable('waitingValue')} }`,
							`  OPTIONAL { ${variable('waitingPeriod')} schema:maxValue ${variable('waitingMax')} }`,
							`  OPTIONAL { ${variable('waitingPeriod')} schema:unitCode ${variable('waitingUnit')} }`,
							`  BIND(IF(STRENDS(STR(${variable('waitingUnit')}), "WK"), 7, 1) AS ${variable('daysPerUnit')})`,
							`  BIND(COALESCE(${variable('waitingMax')}, ${variable('waitingValue')}) * ${variable('daysPerUnit')} AS ${variable('waitingDays')})`,
							'}'
						].join('\n'),
						comment: once('Waiting periods are recorded in days or in weeks; both are compared in days.')
					},
					{text: `FILTER(!BOUND(${variable('waitingDays')}) || ${variable('waitingDays')} <= ${maxDays})`}
				);
			}
			if (criteria.excludedObligations.length) {
				patterns.push(
					excludes(
						indication,
						':obligation',
						`excludedObligation${suffix}`,
						criteria.excludedObligations,
						combinations.excludedObligations,
						aliases
					)
				);
			}
		}

		for (const [index, part] of pestBlocks.entries()) {
			const object = slot(numbered(part.variable, index, pestBlocks.length), termsOf(part.ids, aliases));
			const indication = numbered('?pestIndication', index, pestBlocks.length);
			patterns.push(
				triple(indication, ':product', carrier),
				triple(indication, part.path, object.object, once(part.comment)),
				...object.values
			);
		}
	}

	if (criteria.productTypes.length) {
		patterns.push(
			...requires('?permission', ':productType', 'productType', criteria.productTypes, combinations.productTypes, ITSELF)
		);
	}
	if (criteria.formulations.length) {
		patterns.push(
			...requires('?permission', ':formulation', 'formulation', criteria.formulations, combinations.formulations, aliases)
		);
	}
	if (criteria.countries.length) {
		const country = slot('country', criteria.countries.map(id => `country:${id.replace(/[^A-Z]/gu, '')}`));
		patterns.push(triple('?permission', 'schema:countryOfOrigin', country.object), ...country.values);
	}
	if (criteria.holders.length) {
		const holder = slot('holder', criteria.holders.map(id => iri(`company/${id}`)));
		patterns.push(triple('?permission', ':permissionHolder', holder.object), ...holder.values);
	}
	if (criteria.kinds.length) {
		const kind = slot('kind', criteria.kinds.map(id => iri(id.replace(/[^A-Za-z]/gu, ''))));
		patterns.push(triple('?permission', 'a', kind.object), ...kind.values);
	}
	if (criteria.substances.length) {
		patterns.push(
			...requires('?permission', ':ingredient/:substance', 'substance', criteria.substances, combinations.substances, aliases)
		);
	}
	if (criteria.excludedSubstances.length) {
		patterns.push(
			excludes(
				'?permission',
				':ingredient/:substance',
				'excludedSubstance',
				criteria.excludedSubstances,
				combinations.excludedSubstances,
				aliases
			)
		);
	}
	if (criteria.labelElements.length) {
		patterns.push(
			...requires('?permission', ':ghsLabel', 'labelElement', criteria.labelElements, combinations.labelElements, aliases)
		);
	}
	if (criteria.excludedLabelElements.length) {
		patterns.push(
			excludes(
				'?permission',
				':ghsLabel',
				'excludedLabelElement',
				criteria.excludedLabelElements,
				combinations.excludedLabelElements,
				aliases
			)
		);
	}
	if (criteria.onlyWithoutDeadline) {
		patterns.push({
			text: 'FILTER NOT EXISTS { ?permission :exhaustionDeadline ?deadline }',
			comment: 'Products with an exhaustion deadline have lost their admission and may only be used up.'
		});
	}

	const body = `SELECT DISTINCT ?permission ?name ?id ?permissionHolder
FROM <${GRAPH}>
WHERE {
${layout(patterns).join('\n')}
}
ORDER BY ?name`;
	return `${prefixesFor(body).join('\n')}\n\n${body}`;
}
