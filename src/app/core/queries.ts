import {GRAPH} from './models';

const PREFIXES = `PREFIX ppp: <https://agriculture.ld.admin.ch/plant-protection/>
PREFIX schema: <http://schema.org/>
PREFIX country: <https://ld.admin.ch/country/>
PREFIX unit: <http://qudt.org/vocab/unit/>`;

const FROM = `FROM <${GRAPH}>`;

/** Local part of an IRI within the plant protection namespace, e.g. `crop/1a2b`. */
const local = (variable: string): string => `STRAFTER(STR(?${variable}), "/plant-protection/")`;

/**
 * One row per product, with everything the search page needs to filter and rank.
 *
 * The registry holds 2363 products, so the whole index is fetched once and kept in
 * memory: every keystroke then filters locally instead of round-tripping to LINDAS.
 * Multi-valued properties are folded into `GROUP_CONCAT` lists so that a product stays
 * a single row; without that, products with several formulations appear twice.
 */
export const PRODUCT_INDEX_QUERY = `${PREFIXES}
SELECT
  (STRAFTER(STR(?product), "/product/") AS ?id)
  ?name ?admissionNumber
  (${local('kindIri')} AS ?kind)
  (STRAFTER(STR(?countryIri), "/country/") AS ?country)
  (STRAFTER(STR(?holderIri), "/company/") AS ?holder)
  ?holderName
  (STRAFTER(STR(?reference), "/product/") AS ?referenceProduct)
  ?exhaustionDeadline ?soldOutDeadline
  (GROUP_CONCAT(DISTINCT ${local('typeIri')}; separator=",") AS ?types)
  (GROUP_CONCAT(DISTINCT ${local('formulation')}; separator=",") AS ?formulations)
  (GROUP_CONCAT(DISTINCT ${local('substance')}; separator=",") AS ?substances)
  (GROUP_CONCAT(DISTINCT ${local('labelElement')}; separator=",") AS ?labelElements)
${FROM}
WHERE {
  VALUES ?kindIri { ppp:RegularProduct ppp:SalePermission ppp:ParallelImport }
  ?product a ppp:Product, ?kindIri ;
    schema:name ?name ;
    ppp:federalAdmissionNumber ?admissionNumber ;
    schema:countryOfOrigin ?countryIri .
  OPTIONAL { ?product ppp:productType ?typeIri }
  OPTIONAL { ?product ppp:permissionHolder ?holderIri . ?holderIri schema:legalName ?holderName }
  OPTIONAL { ?product ppp:formulation ?formulation }
  OPTIONAL { ?product ppp:ingredient/ppp:substance ?substance }
  OPTIONAL { ?product ppp:ghsLabel ?labelElement }
  OPTIONAL { ?product ppp:referenceProduct ?reference }
  OPTIONAL { ?product ppp:exhaustionDeadline ?exhaustionDeadline }
  OPTIONAL { ?product ppp:soldOutDeadline ?soldOutDeadline }
}
GROUP BY ?product ?name ?admissionNumber ?kindIri ?countryIri ?holderIri ?holderName ?reference
  ?exhaustionDeadline ?soldOutDeadline`;

/**
 * The crops, pests, application areas and obligations reachable from each product.
 *
 * Flattened per product on purpose: it answers "which products may be used on wheat"
 * in a single pass over memory. Questions that need crop and pest to meet in the *same*
 * indication are answered by {@link buildAdvancedQuery} on the endpoint instead.
 */
export const PRODUCT_USE_INDEX_QUERY = `${PREFIXES}
SELECT
  (STRAFTER(STR(?product), "/product/") AS ?id)
  (GROUP_CONCAT(DISTINCT ${local('crop')}; separator=",") AS ?crops)
  (GROUP_CONCAT(DISTINCT ${local('pest')}; separator=",") AS ?pests)
  (GROUP_CONCAT(DISTINCT ${local('area')}; separator=",") AS ?applicationAreas)
  (GROUP_CONCAT(DISTINCT ${local('obligation')}; separator=",") AS ?obligations)
${FROM}
WHERE {
  ?indication a ppp:Indication ;
    ppp:product ?product ;
    ppp:applicationArea ?area .
  OPTIONAL { ?indication ppp:crop ?crop }
  OPTIONAL { ?indication ppp:pest ?pest }
  OPTIONAL { ?indication ppp:obligation ?obligation }
}
GROUP BY ?product`;

/**
 * Every code list term with a label in `language`.
 *
 * German and French are complete in the graph, Italian nearly so and English patchy, so
 * the label falls back through German to French rather than leaving a term unnamed.
 */
export const termsQuery = (language: string): string => `${PREFIXES}
SELECT
  (${local('term')} AS ?id)
  (${local('class')} AS ?type)
  ?code
  (SAMPLE(?candidate) AS ?label)
  (SAMPLE(?stable) AS ?stableLabel)
  (GROUP_CONCAT(DISTINCT ${local('parent')}; separator=",") AS ?parents)
${FROM}
WHERE {
  VALUES ?class {
    ppp:Crop ppp:Pest ppp:Obligation ppp:Substance ppp:ApplicationArea ppp:ApplicationComment
    ppp:FormulationType ppp:HazardStatement ppp:HazardPictogram ppp:SignalWord ppp:PlantProtectionStatement
  }
  ?term a ?class .
  OPTIONAL { ?term schema:identifier ?code }
  OPTIONAL { ?term schema:isPartOf ?parent }
  OPTIONAL { ?term schema:name ?requested FILTER(LANG(?requested) = "${language}") }
  OPTIONAL { ?term schema:name ?german FILTER(LANG(?german) = "de") }
  OPTIONAL { ?term schema:name ?french FILTER(LANG(?french) = "fr") }
  BIND(COALESCE(?requested, ?german, ?french) AS ?candidate)
  # A language independent key, so that concepts that the graph holds twice are
  # recognised as one and the same whichever language the interface is showing.
  BIND(COALESCE(?german, ?french) AS ?stable)
}
GROUP BY ?term ?class ?code`;

/**
 * Country names.
 *
 * Countries are described in the default graph, not in the registry's own graph, so the
 * `FROM` clause of every other query silently hides them. This one names the registry's
 * graph explicitly for the countries it uses — of production and of the permission
 * holders' addresses, which reach well beyond the six countries products come from — and
 * reads the names outside it.
 */
export const countriesQuery = (language: string): string => `${PREFIXES}
SELECT (STRAFTER(STR(?country), "/country/") AS ?id) (SAMPLE(?candidate) AS ?label)
WHERE {
  {
    SELECT DISTINCT ?country WHERE {
      GRAPH <${GRAPH}> {
        { ?product schema:countryOfOrigin ?country } UNION { ?address schema:addressCountry ?country }
      }
    }
  }
  OPTIONAL { ?country schema:name ?requested FILTER(LANG(?requested) = "${language}") }
  OPTIONAL { ?country schema:name ?german FILTER(LANG(?german) = "de") }
  BIND(COALESCE(?requested, ?german) AS ?candidate)
}
GROUP BY ?country`;

const productIri = (id: string): string => `<https://agriculture.ld.admin.ch/plant-protection/product/${iriSafe(id)}>`;

/** The ingredients of a product, each with its share where one is recorded. */
export const ingredientsQuery = (id: string): string => `${PREFIXES}
SELECT
  (${local('substanceIri')} AS ?substance)
  (${local('roleIri')} AS ?role)
  ?shareValue ?shareMin ?shareMax ?shareUnit
${FROM}
WHERE {
  ${productIri(id)} ppp:ingredient ?ingredient .
  ?ingredient ppp:substance ?substanceIri .
  OPTIONAL { ?substanceIri a ?roleIri FILTER(?roleIri != ppp:Substance) }
  OPTIONAL {
    ?ingredient ppp:share ?share .
    OPTIONAL { ?share schema:value ?shareValue }
    OPTIONAL { ?share schema:minValue ?shareMin }
    OPTIONAL { ?share schema:maxValue ?shareMax }
    OPTIONAL { ?share schema:unitText ?shareText }
    OPTIONAL { ?share schema:unitCode ?shareCode }
    BIND(COALESCE(?shareText, REPLACE(STR(?shareCode), "^.*/unit/", "")) AS ?shareUnit)
  }
}`;

/** The permission holder with its postal address and contact details. */
export const organizationQuery = (id: string): string => `${PREFIXES}
SELECT
  ?legalName ?street ?postalCode ?locality
  (STRAFTER(STR(?countryIri), "/country/") AS ?country)
  (GROUP_CONCAT(DISTINCT ?telephone; separator=",") AS ?telephones)
  (GROUP_CONCAT(DISTINCT ?email; separator=",") AS ?emails)
${FROM}
WHERE {
  BIND(<https://agriculture.ld.admin.ch/plant-protection/company/${iriSafe(id)}> AS ?organization)
  ?organization schema:legalName ?legalName .
  OPTIONAL { ?organization schema:telephone ?telephone }
  OPTIONAL { ?organization schema:email ?email }
  OPTIONAL {
    ?organization schema:address ?address .
    OPTIONAL { ?address schema:streetAddress ?street }
    OPTIONAL { ?address schema:postalCode ?postalCode }
    OPTIONAL { ?address schema:addressLocality ?locality }
    OPTIONAL { ?address schema:addressCountry ?countryIri }
  }
}
GROUP BY ?legalName ?street ?postalCode ?locality ?countryIri`;

/** Sale permissions and parallel imports that rest on this product's admission. */
export const derivedProductsQuery = (id: string): string => `${PREFIXES}
SELECT (STRAFTER(STR(?derived), "/product/") AS ?id) ?name (${local('kindIri')} AS ?kind)
${FROM}
WHERE {
  VALUES ?kindIri { ppp:SalePermission ppp:ParallelImport }
  ?derived ppp:referenceProduct ${productIri(id)} ; a ?kindIri ; schema:name ?name .
}
ORDER BY ?name`;

/** Foreign admission and package insert numbers, which only parallel imports carry. */
export const importNumbersQuery = (id: string): string => `${PREFIXES}
SELECT
  (GROUP_CONCAT(DISTINCT ?foreign; separator=",") AS ?foreignAdmissionNumbers)
  (GROUP_CONCAT(DISTINCT ?insert; separator=",") AS ?packageInsertNumbers)
${FROM}
WHERE {
  OPTIONAL { ${productIri(id)} ppp:foreignAdmissionNumber ?foreign }
  OPTIONAL { ${productIri(id)} ppp:packageInsertNumber ?insert }
}`;

/** Every indication of a product, with its conditions resolved to one row each. */
export const indicationsQuery = (id: string): string => `${PREFIXES}
SELECT
  (STRAFTER(STR(?indication), "/indication/") AS ?id)
  (${local('area')} AS ?applicationArea)
  (GROUP_CONCAT(DISTINCT ${local('crop')}; separator=",") AS ?crops)
  (GROUP_CONCAT(DISTINCT CONCAT(${local('pest')}, "~", ?effect); separator=",") AS ?pests)
  (GROUP_CONCAT(DISTINCT ${local('obligation')}; separator=",") AS ?obligations)
  (GROUP_CONCAT(DISTINCT ${local('comment')}; separator=",") AS ?comments)
  ?dosageValue ?dosageMin ?dosageMax ?dosageUnit
  ?expenditureValue ?expenditureMin ?expenditureMax ?expenditureUnit
  ?waitingValue ?waitingMin ?waitingMax ?waitingUnit
${FROM}
WHERE {
  ?indication ppp:product ${productIri(id)} ; ppp:applicationArea ?area .
  OPTIONAL { ?indication ppp:crop ?crop }
  OPTIONAL {
    ?indication ppp:pest ?pest .
    BIND(IF(EXISTS { ?indication ppp:fullEffect ?pest }, "full",
         IF(EXISTS { ?indication ppp:partialEffect ?pest }, "partial",
         IF(EXISTS { ?indication ppp:sideEffect ?pest }, "side", ""))) AS ?effect)
  }
  OPTIONAL { ?indication ppp:obligation ?obligation }
  OPTIONAL { ?indication ppp:applicationComment ?comment }
  ${quantity('dosage', 'ppp:dosage')}
  ${quantity('expenditure', 'ppp:expenditure')}
  ${quantity('waiting', 'ppp:waitingPeriod')}
}
GROUP BY ?indication ?area ?dosageValue ?dosageMin ?dosageMax ?dosageUnit
  ?expenditureValue ?expenditureMin ?expenditureMax ?expenditureUnit
  ?waitingValue ?waitingMin ?waitingMax ?waitingUnit
ORDER BY ?applicationArea`;

/**
 * Reads a `schema:QuantitativeValue` into four flat variables.
 *
 * `schema:unitCode` carries a doubled `http://qudt.org/vocab/unit/` prefix throughout the
 * graph, so it is only used when the human readable `schema:unitText` is absent, and the
 * repeated prefix is stripped rather than parsed.
 */
function quantity(prefix: string, path: string): string {
	return `OPTIONAL {
    ?indication ${path} ?${prefix} .
    OPTIONAL { ?${prefix} schema:value ?${prefix}Value }
    OPTIONAL { ?${prefix} schema:minValue ?${prefix}Min }
    OPTIONAL { ?${prefix} schema:maxValue ?${prefix}Max }
    OPTIONAL { ?${prefix} schema:unitText ?${prefix}Text }
    OPTIONAL { ?${prefix} schema:unitCode ?${prefix}Code }
    BIND(COALESCE(?${prefix}Text, REPLACE(STR(?${prefix}Code), "^.*/unit/", "")) AS ?${prefix}Unit)
  }`;
}

/** Guards against a hand-edited identifier from the URL breaking out of an IRI reference. */
function iriSafe(id: string): string {
	return id.replace(/[^A-Za-z0-9._~-]/gu, '');
}
