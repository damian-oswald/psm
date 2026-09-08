/** Domain model of the Swiss registry of plant protection products (SRPPP). */

export const PPP = 'https://agriculture.ld.admin.ch/plant-protection/';
export const GRAPH = 'https://lindas.admin.ch/fsvo/plant-protection-products';

/** The three admission kinds a product can have. */
export type ProductKind = 'RegularProduct' | 'SalePermission' | 'ParallelImport';

/** A term of a code list: anything that is a *thing* rather than a string. */
export interface Term {
	/** Identifier local to its code list, used in URLs and query parameters. */
	id: string;
	/** Label in the currently active language, with a fallback to German and French. */
	label: string;
	/** Official code, where the code list has one (`H319`, `EC`, `GHS07`, `W`, ...). */
	code?: string;
	/** Number of products the term is attached to; used to order and annotate options. */
	count?: number;
}

/** A crop, which is organised in a shallow hierarchy (`Getreide` > `Weizen`). */
export interface Crop extends Term {
	parents: string[];
	/** Transitive closure of {@link parents}, root first. */
	ancestors: string[];
}

/** A `schema:QuantitativeValue`: a value, a range, or a bounded range, with a unit. */
export interface Quantity {
	value?: number;
	min?: number;
	max?: number;
	unit?: string;
}

/** One admitted use of a product: a crop, a pest, and the conditions that apply. */
export interface Indication {
	id: string;
	applicationArea: string;
	crops: string[];
	pests: {id: string; effect: 'full' | 'partial' | 'side' | ''}[];
	obligations: string[];
	comments: string[];
	dosage?: Quantity;
	expenditure?: Quantity;
	waitingPeriod?: Quantity;
}

/** A product as held in the in-memory index that backs search and filtering. */
export interface Product {
	/** The federal admission number, which doubles as the IRI's local name. */
	id: string;
	name: string;
	admissionNumber: string;
	kind: ProductKind;
	/** Product type classes, e.g. `Herbicide`. */
	types: string[];
	country: string;
	holder?: string;
	holderName?: string;
	formulations: string[];
	substances: string[];
	/** GHS and plant protection labelling elements, of all four kinds. */
	labelElements: string[];
	exhaustionDeadline?: string;
	soldOutDeadline?: string;
	/** Reference product of a sale permission or parallel import. */
	referenceProduct?: string;
	/** True when the uses below are the reference product's rather than the product's own. */
	usesInherited: boolean;
	/** Crops of the product's own indications, or of its reference product's. */
	crops: string[];
	/** Transitive closure of {@link crops} over the crop hierarchy. */
	cropsWithParents: string[];
	pests: string[];
	applicationAreas: string[];
	obligations: string[];
	/** Lower-cased haystack for the free-text search. */
	haystack: string;
}

/** Full detail of a single product, assembled on demand for the detail page. */
export interface ProductDetail {
	product: Product;
	ingredients: {substance: string; role?: string; shares: Quantity[]}[];
	organization?: Organization;
	indications: Indication[];
	/** Products that name this product as their reference product. */
	derivedProducts: {id: string; name: string; kind: ProductKind}[];
	foreignAdmissionNumbers: string[];
	packageInsertNumbers: string[];
	/** True when the indications shown are those of the reference product. */
	indicationsInherited: boolean;
}

export interface Organization {
	id: string;
	legalName: string;
	street?: string;
	postalCode?: string;
	locality?: string;
	country?: string;
	telephones: string[];
	emails: string[];
}

/** The four kinds of labelling element that `ppp:ghsLabel` points at. */
export type LabelElementKind = 'HazardPictogram' | 'SignalWord' | 'HazardStatement' | 'PlantProtectionStatement';

export interface LabelElement extends Term {
	kind: LabelElementKind;
}
