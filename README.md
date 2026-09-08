## Endpoint

Data can be queried via SPARQL endpoint

<https://lindas.admin.ch/query>

## Graph

The graph name on LINDAS is

<https://lindas.admin.ch/fsvo/plant-protection-products>

## Example

One example plant protection product:

<https://agriculture.ld.admin.ch/plant-protection/product/W-7300>

``` ttl
@prefix schema: <http://schema.org/> .
@prefix ns0: <https://agriculture.ld.admin.ch/plant-protection/> .

<https://agriculture.ld.admin.ch/plant-protection/product/W-7300>
  a <https://agriculture.ld.admin.ch/plant-protection/Product>, <https://agriculture.ld.admin.ch/plant-protection/Herbicide>, <https://agriculture.ld.admin.ch/plant-protection/RegularProduct> ;
  schema:name "Pointer Plus" ;
  schema:identifier "W-7300" ;
  ns0:federalAdmissionNumber "W-7300" ;
  ns0:formulation <https://agriculture.ld.admin.ch/plant-protection/code/779345b1-910c-403e-a453-3de9336fbcab> ;
  schema:countryOfOrigin <https://ld.admin.ch/country/CHE> ;
  ns0:ingredient [
    a ns0:Ingredient ;
    ns0:substance <https://agriculture.ld.admin.ch/plant-protection/substance/1769>
  ], [
    a ns0:Ingredient ;
    ns0:substance <https://agriculture.ld.admin.ch/plant-protection/substance/c70b01c0-b9c2-4d34-8b5b-684ec0356f95> ;
    ns0:share [
      a schema:QuantitativeValue ;
      schema:value 8.3 ;
      schema:unitCode <http://qudt.org/vocab/unit/PERCENT>
    ]
  ], [
    a ns0:Ingredient ;
    ns0:substance <https://agriculture.ld.admin.ch/plant-protection/substance/6d80509f-0ed5-4f2b-81a2-ab85e082be64> ;
    ns0:share [
      a schema:QuantitativeValue ;
      schema:value 10.5 ;
      schema:unitCode <http://qudt.org/vocab/unit/PERCENT>
    ]
  ], [
    a ns0:Ingredient ;
    ns0:substance <https://agriculture.ld.admin.ch/plant-protection/substance/b5879942-b6e2-43d6-a3fb-bb6d931ea12f> ;
    ns0:share [
      a schema:QuantitativeValue ;
      schema:value 8.3 ;
      schema:unitCode <http://qudt.org/vocab/unit/PERCENT>
    ]
  ], [
    a ns0:Ingredient ;
    ns0:substance <https://agriculture.ld.admin.ch/plant-protection/substance/2034>
  ] ;
  ns0:permissionHolder <https://agriculture.ld.admin.ch/plant-protection/company/5086e8cb-6af0-48ed-99df-c3524b2f3a4b> ;
  ns0:productType ns0:Herbicide ;
  ns0:ghsLabel <https://agriculture.ld.admin.ch/plant-protection/code/35aa52aa-fc8a-4908-b997-18dc1e140409>, <https://agriculture.ld.admin.ch/plant-protection/code/1184b376-282f-42dd-82c1-81320ea4f4ab>, <https://agriculture.ld.admin.ch/plant-protection/code/1acacce6-e914-4f44-a528-9a46d04603ce>, <https://agriculture.ld.admin.ch/plant-protection/code/2fef4640-8849-47dd-a0e3-2943929c2d09>, <https://agriculture.ld.admin.ch/plant-protection/code/8b266770-b9cf-4c9d-8789-c45dbbfe4976>, <https://agriculture.ld.admin.ch/plant-protection/code/ca72d762-e72e-40db-82dd-6e38cc45f463>, <https://agriculture.ld.admin.ch/plant-protection/code/165aaa1a-0c69-4230-9119-be53811b329c>, <https://agriculture.ld.admin.ch/plant-protection/code/132e9c76-f989-464d-ae90-fa77f826c314>, <https://agriculture.ld.admin.ch/plant-protection/code/a94ac3ff-35e2-4b4b-98bf-20f260467093> .
```

## Schema

The full schema is saved to <model.shacl.ttl>

## Task

Your task is to write *a really cool and modern looking registry of plant protection products*.

Make sure to explore the data a little bit before writing the application.

I want it to do more or less the same as today's application on psm.admin.ch, but with a much nicer UI and UX.

(Don't copy any of the existing layout, it's horrible.)

This means I want to be able to

1. search products,
2. filter products (by all sorts of stuff)
3. inspect products (render all details nicely)

It would also be cool to have some "extended filter" that will run custom sparql queries to, for example, show all products:

1. that can be applied on wheat,
2. against some herb
3. and do not contain a special danger symbol, or some specific obligation etc.
4. ... be creative.

(Note that many *thing* in the data model are really things, not strings -- you can make use of that feature...)

I expect a Angular application, front-end only (all data should be fetched from LINDAS directly. Make sure queries are performant.)
Use the oblique design system: <https://oblique.bit.admin.ch/introductions/welcome> (<https://github.com/oblique-bit/oblique>).
Make sure to use the elements from version 15.4.4 (latest)
The application should look professional, like a real application by the federal administration. So no emojis!

Some things I like:

- search with autocomplete, for searching very long code lists
- card as link, for products.
- badge, to show applied filters
- paginators
- toggle?

You can have a look at this repo to see how oblique is used as a static website: <https://github.com/blw-ofag-ufag/data-catalog>

## Some things to think about

Data model surprises

- The 23 productType classes have no multilingual labels at all in the graph -- only English ones. Also, no rdfs:label, but schema:name and schema:description. Note that http://schema.org/ is used, not https://schema.org/
- Country labels live in the default graph, so FROM <fsvo graph> silently excludes them — needs a separate query.
- schema:unitCode has a doubled-prefix bug; schema:unitText is the usable field.
- ppp:pest and ppp:fullEffect frequently hold identical IRIs → duplicate rendering without a dedupe. ppp:fullEffect (and the other Effects) are subproperties of ppp:pest, so this makes sense.
- QuantitativeValue has three value shapes plus an optional original display-text string.
- W-7300 (the README's example) has only one indication — a weak choice for testing the detail view.

Angular 17 gotchas that cost time

- computed() doesn't track plain @Input() properties — the async-loaded multi-select lists came up empty until I switched to signal inputs.
- Signal writes in an effect() need allowSignalWrites, even when the efethod (its synchronous prefix still runs inside the effect).
- AOT build catches neither of those — a headless smoke test is worth setting up first.

Tooling / decisions

- No system browser here; @puppeteer/browsers install chrome + puppeteeend check that caught both bugs above.
- Endpoint performance anxiety was unfounded; GROUP_CONCAT + many OPTIONALs over all products returns sub-second.
---

# The application

An Angular 21 single page application built on the [Oblique design system](https://oblique.bit.admin.ch) 15.4.4. It has no
back end of its own: every figure on every page is read from the LINDAS SPARQL endpoint at run time.

It is a demonstration. The data is real, but the operating office named in the footer and in the accessibility
statement — Federal Office XYZ — is invented, as are its address and contact details.

## The pages

- **Search** — a free-text field and six filters: crop, pest, permission holder, active substance, product type and
  admission status. That is what a grower arrives with; every other way of interrogating the registry is a specialist's
  question and lives on the advanced query page, which the panel links to. The long code lists are typed into Oblique's
  autocomplete, which underlines the part of each option that matched; the short ones are multi-select dropdowns
  carrying the number of products behind each value. Selected terms become removable chips, and a chip shows a term's
  code where it has a speaking one, since obligations and hazard statements run to hundreds of characters. Results are
  shown twelve to a page as cards that are entirely links, and the filters are mirrored in the URL so that a result list
  can be shared. The crop filter always includes the crops below the selected one, which is what a plain crop filter
  should mean; the advanced query can turn that off.
- **Product detail** — one reading column in the order a person needs it: what the product is and whether it may still
  be used, then who holds its admission and what is in it, then how it is labelled, then the indications, which are the
  long part, and finally the admissions derived from it. The overview is a single definition list, so the permission
  holder and the active substances are visible without scrolling. Indications are grouped by application area and can be
  narrowed by crop and by pest. The codes that identify a term for a machine — the letter of an application area, the
  CropLife formulation code, the number of an obligation — are left out, since the name beside them already says what
  they say.
- **Advanced query** — every criterion the registry supports, laid out in one grid at the top of the page with the run
  button in the heading row so that it never drifts below the fold, and the result underneath. Each dropdown offers only
  the values that are still reachable under the criteria already set, so a question cannot be narrowed to nothing one
  field at a time; `criteria-match.ts` computes that against the in-memory index, the way the search page computes its
  facet counts. It is a product-level approximation — whether crop and pest meet in the *same* indication, the kind of
  effect and the waiting period are for the endpoint to decide — so the count can still come out lower than the
  dropdowns suggested, but not empty for want of a plausible combination. The SPARQL the criteria compile to is a
  secondary control: a quiet toggle beside the result count, shown once there is a result to explain.

A result card carries only what tells one product from another — trade name, admission number, product type, permission
holder, admission status and the hazard pictograms. Composition and admission type are a click away on the detail page,
and putting them on the card only made the grid harder to scan.

## Running it

```bash
npm install
npm start          # development server on http://localhost:4200
npm run build      # production bundle in dist/psm
npm run smoke      # headless check of every route, fails on any console error
node tools/interact.mjs   # drives search, filters, detail view and the query builder
node tools/lang.mjs       # switches language and verifies the labels follow
```

The headless checks need a running dev server; they write screenshots to `tools/screenshots`.

## Deployment

The application is a static bundle, so it is served from GitHub Pages with no server of its own.

```bash
npm run build:pages   # production build for Pages, in dist/psm/browser
```

`tools/build-pages.mjs` takes the base href from the repository the workflow runs in — a project site lives under
`https://<user>.github.io/<repository>/`, so the bundle has to know its sub-path — and falls back to `/psm/` when the
build is run by hand. It then does the two things Pages needs:

- **`404.html`**, a copy of `index.html`. Pages serves static files and has no rewrite that would map
  `/psm/products/W-6880` onto the application, so it answers 404. Serving the same document as `404.html` makes that
  answer boot the application, which routes on the address the browser already has; deep links and reloads therefore
  work, at the cost of the response carrying a 404 status.
- **`.nojekyll`**, which stops Pages from running the output through Jekyll and dropping files whose names begin with an
  underscore.

`.github/workflows/deploy.yml` runs that build on every push to `main` and force-pushes the output to the `gh-pages`
branch, which Pages is configured to serve. Only built files live on that branch and its history is replaced each time,
so it never accumulates old bundles. The workflow needs no secret beyond the `GITHUB_TOKEN` that Actions provides.

To check the build the way Pages will serve it, rather than against a more forgiving server:

```bash
npm run build:pages
DIST_BASE=/psm node tools/serve-dist.mjs
SMOKE_BASE=http://localhost:4300/psm npm run smoke
```

`tools/serve-dist.mjs` mounts the output under a base path and answers unknown paths with `404.html` and a 404 status,
which is what catches a wrong base href or a deep link that only worked because the server was too helpful.

## How the data is loaded

Three queries are issued once at start-up and answer everything the search page asks:

| Query | Purpose | Rows |
| --- | --- | --- |
| `PRODUCT_INDEX_QUERY` | one row per product, with its type, holder, formulation, substances and labelling | 2363 |
| `PRODUCT_USE_INDEX_QUERY` | the crops, pests, application areas and obligations reachable from each product | 1107 |
| `termsQuery` | every code list term, labelled in the active language | 3906 |

Every one of them raises Oblique's spinner while it is in flight, so any wait on the endpoint is visible wherever it
happens; the call is deferred by a turn, because queries start from constructors and effects that run while Angular is
checking the view, and toggling the spinner there would change the master layout in the middle of that check.

Together they are roughly 600 kB gzipped. Keeping the index in memory is what makes the search feel immediate: every
keystroke, facet and sort re-ranks all 2363 products locally, and the facet counts are computed the way faceted search
expects — each facet is counted over the products that pass all the *other* filters, so selecting a value never empties
its own list. Only the detail view and the advanced query go back to the endpoint, and both answer in well under a second.

Switching the interface language reloads only the labels; the product index is language independent.

## The advanced query

`src/app/core/advanced-query.ts` compiles a structured question into SPARQL. Every criterion names a *thing* — a crop, a
pest, a hazard pictogram, an obligation — so the generated query contains no string matching at all. It is shown next to
its own result, commented, and can be copied or opened in the LINDAS query editor unchanged.

The page exists because three kinds of question cannot be answered against a flattened index:

- **Crop and pest in the same indication.** The search page finds products that mention wheat *and* mention a weed; the
  query builder finds products admitted against that weed *in* wheat.
- **The kind of effect.** `ppp:fullEffect`, `ppp:partialEffect` and `ppp:sideEffect` refine `ppp:pest`, and the query
  restricts the match to the ones asked for.
- **Numeric conditions and exclusions**, such as a waiting period of at most seven days, or the absence of a pictogram.

Its criteria stay grouped under headings, unlike the search panel: there the groups separate what a product must have
from what it must not, which changes the meaning of the field rather than merely tidying the layout.

Sub-crops are matched with the property path `ppp:crop/schema:isPartOf*`, so asking for `Getreide` also finds
`Winterweizen`. Inherited uses are matched with `ppp:referenceProduct?`, so a parallel import is found through the
indications of the product its admission rests on.

## What the data model made us do

- **Product types have English names only.** The 23 `ppp:productType` classes carry `schema:name` in English and nothing
  else, so their German, French and Italian names live in `src/assets/i18n`. Every other code list is read from the graph
  and falls back through German to French where a translation is missing.
- **Countries live in the default graph.** `FROM <…/plant-protection-products>` hides them, so `countriesQuery` names
  the registry's graph explicitly for the countries it needs and reads their names outside it. Products come from six
  countries but permission holders sit in eighteen, so the query collects both rather than a fixed list.
- **`schema:unitCode` carries a doubled namespace prefix** throughout the graph. Units are read from `schema:unitText`
  and the code is only used for the four units that have no text, with the repeated prefix stripped rather than parsed.
- **`ppp:pest` and `ppp:fullEffect` hold the same IRIs.** Effects are resolved per pest with `EXISTS`, so each pest is
  rendered once, annotated with its effect.
- **Sale permissions and parallel imports carry no indications.** Both search and detail view resolve them through
  `ppp:referenceProduct`, and the detail view says whose indications it is showing.
- **Hazard pictograms have no `schema:image`.** They are addressed by their code against the registry's own image
  service, `https://www.psm.admin.ch/images/psm/<code>.gif`. If an image cannot be loaded the code is drawn inside the
  hazard rhombus instead, so the hazard stays legible.
- **A few concepts are described twice.** Six hazard statements — `EUH401` among them — thirty application comments and
  five substances exist under two IRIs each with identical code and text. `RegistryService` folds them onto one term,
  keyed by code and German name so the grouping does not shift with the interface language. Without it the labelling
  filter offered `EUH401` twice and each entry missed the products referencing the other IRI; `buildAdvancedQuery` takes
  an alias function and names every identifier of a folded concept in the query it generates.

## Layout of the source

```
src/app/
  core/       SPARQL client, queries, the in-memory registry, the query compiler
  shared/     product card, GHS pictogram, autocomplete and multi-select term pickers, status badge
  pages/      product-search, product-detail, advanced-query, about
tools/        headless smoke, interaction and language checks
```
