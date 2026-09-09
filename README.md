# Swiss plant protection product registry — prototype

> [!WARNING]
> **This is a prototype, built for demonstration purposes only.**
>
> It is not an official application. It is not commissioned, operated or endorsed by any federal office, and the
> "Federal Office XYZ" named in its footer is invented. The Swiss coat of arms comes from the design system and does
> not make this an official service.
>
> The data is read live from the federal linked data service, but the way this prototype selects, combines and presents
> it has not been reviewed and may be incomplete or wrong. **Do not use it for any decision about the use of plant
> protection products.** The authoritative register is [psm.admin.ch](https://www.psm.admin.ch).

A single-page application that presents the Swiss registry of plant protection products. It has no back end: every
figure on every page is read at run time from the [LINDAS](https://lindas.admin.ch) SPARQL endpoint, straight from the
browser.

**Live demo:** <https://damian-oswald.github.io/psm/>

## What it does

- **Search** — free text plus six filters (crop, pest, permission holder, active substance, product type, admission
  status) over all 2363 products, with the filters mirrored in the URL so a result list can be shared.
- **Product detail** — one reading column: what the product is, who holds its admission and what is in it, how it is
  labelled, and its indications, which can be narrowed by crop and by pest.
- **Advanced query** — structured criteria compiled into SPARQL and run against LINDAS. Every criterion names a *thing*
  in the data model rather than a string, each dropdown offers only values still reachable under the criteria already
  set, and the generated query can be read and copied.

## Data

| | |
| --- | --- |
| Endpoint | `https://lindas.admin.ch/query` |
| Named graph | `https://lindas.admin.ch/fsvo/plant-protection-products` |
| Data model | [`model.shacl.ttl`](model.shacl.ttl) |

Three queries at start-up (about 600 kB gzipped) put the whole registry in memory, so searching, filtering and faceting
never touch the network again. Only the detail view and the advanced query go back to the endpoint.

A few properties of the data that shaped the code:

- Product type classes carry English names only; their translations live in `src/assets/i18n`.
- Countries are described outside the registry's graph, so their query does not use its `FROM` clause.
- `schema:unitCode` carries a doubled namespace prefix, so units are read from `schema:unitText`.
- `ppp:fullEffect` and its siblings refine `ppp:pest`, so each pest is resolved once and annotated with its effect.
- Sale permissions and parallel imports carry no indications of their own and inherit their reference product's.
- A few concepts exist twice under different IRIs and are folded into one, so a filter finds the products of both.
- Hazard pictograms have no image in the graph, so the public-domain UN SVGs from Wikimedia Commons are bundled under `src/assets/ghs` and picked by their code.

## Running it

```bash
npm install
npm start                 # dev server on http://localhost:4200
npm run build             # production bundle
npm run smoke             # headless check of every route, fails on any console error
node tools/interact.mjs   # drives search, filters, detail view and the query builder
node tools/lang.mjs       # switches language and checks that the data labels follow
```

The headless checks need a running server and write screenshots to `tools/screenshots`.

## Deployment

`npm run build:pages` builds for GitHub Pages: it takes the base href from the repository, copies `index.html` to
`404.html` so that deep links boot the application, and writes `.nojekyll`. On every push to `main`,
`.github/workflows/deploy.yml` runs that build and force-pushes the output to the `gh-pages` branch, which Pages serves.

To check a build the way Pages will serve it:

```bash
npm run build:pages
DIST_BASE=/psm node tools/serve-dist.mjs
SMOKE_BASE=http://localhost:4300/psm npm run smoke
```

## Built with

[Angular](https://angular.dev) 21 and the [Oblique](https://oblique.bit.admin.ch) design system 15.4.4.

---

The brief this prototype was written against is preserved in the first commit of this repository.
