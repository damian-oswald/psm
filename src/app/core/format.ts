import {Product, Quantity, Term} from './models';
import {Row} from './sparql.service';

/**
 * Units that only appear as a QUDT code.
 *
 * `schema:unitCode` is unusable throughout the graph — every value carries the
 * `http://qudt.org/vocab/unit/` prefix twice — so queries strip the prefix and keep the
 * bare code. `schema:unitText` covers the compound units; these four do not have one.
 */
const UNIT_LABELS: Record<string, string> = {
	PERCENT: '%',
	'GM-PER-L': 'g/l',
	DAY: 'unit.day',
	WK: 'unit.week'
};

/** True when the unit label has to be translated rather than printed verbatim. */
export function isTranslatableUnit(unit: string | undefined): boolean {
	return !!unit && (UNIT_LABELS[unit] ?? '').startsWith('unit.');
}

export function unitLabel(unit: string | undefined): string {
	if (!unit) {
		return '';
	}
	return UNIT_LABELS[unit] ?? unit;
}

/** Reads the four flattened quantity columns of a result row. */
export function readQuantity(row: Row, prefix: string): Quantity | undefined {
	const value = row[`${prefix}Value`];
	const min = row[`${prefix}Min`];
	const max = row[`${prefix}Max`];
	const unit = row[`${prefix}Unit`];
	if (value === undefined && min === undefined && max === undefined) {
		return undefined;
	}
	return {
		value: value === undefined ? undefined : Number(value),
		min: min === undefined ? undefined : Number(min),
		max: max === undefined ? undefined : Number(max),
		unit
	};
}

/** Formats the numeric part of a quantity; the unit is appended by the caller. */
export function formatNumbers(quantity: Quantity, locale: string): string {
	const format = (value: number): string => new Intl.NumberFormat(locale, {maximumFractionDigits: 4}).format(value);
	if (quantity.min !== undefined && quantity.max !== undefined) {
		return `${format(quantity.min)}–${format(quantity.max)}`;
	}
	if (quantity.min !== undefined) {
		return `≥ ${format(quantity.min)}`;
	}
	if (quantity.max !== undefined) {
		return `≤ ${format(quantity.max)}`;
	}
	return quantity.value === undefined ? '' : format(quantity.value);
}

export type AdmissionStatus = 'authorised' | 'expiring' | 'expired';

/**
 * Where a product stands today.
 *
 * A product keeps its entry after its admission is revoked: it may still be sold until
 * the sold-out deadline and used until the exhaustion deadline. Only the latter ends it.
 */
export function admissionStatus(product: Product, today = new Date()): AdmissionStatus {
	if (!product.exhaustionDeadline) {
		return 'authorised';
	}
	return new Date(product.exhaustionDeadline) < today ? 'expired' : 'expiring';
}

/** Shortens a text to `length` characters, ending on a word boundary where there is one. */
export function truncate(text: string, length: number): string {
	if (text.length <= length) {
		return text;
	}
	const cut = text.slice(0, length);
	const lastSpace = cut.lastIndexOf(' ');
	return `${(lastSpace > length * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}

/**
 * A term as it fits on a chip or a badge.
 *
 * Obligations and hazard statements are whole sentences — up to 678 characters — which no
 * chip can carry. Where the code list has a speaking code (`H410`, `SP 1`, `EC`) that code
 * identifies the term far better than the first few words of its text; the numeric codes
 * of the obligations say nothing, so those fall back to a shortened label.
 */
export function shortTermLabel(term: Term, length = 28): string {
	const code = term.code ?? '';
	if (code.length > 0 && code.length <= 8 && /[a-z]/iu.test(code)) {
		return code;
	}
	return truncate(term.label, length);
}

/** The full text of a term, for the `title` of a shortened rendering. */
export function fullTermLabel(term: Term): string {
	return term.code ? `${term.code} — ${term.label}` : term.label;
}
