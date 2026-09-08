/**
 * Builds the application for GitHub Pages and prepares the output for it.
 *
 * A project site is served from a sub-path — `https://<user>.github.io/<repository>/` —
 * so the bundle needs a matching base href. It is taken from the repository the workflow
 * runs in, which keeps the build correct if the repository is ever renamed, and falls back
 * to the name this project uses when building by hand.
 *
 * Pages serves static files only: it has no rewrite that would map `/psm/products/W-6880`
 * onto `index.html`, and answers 404 instead. Serving the same document as `404.html`
 * makes that answer boot the application, which then routes on the address the browser
 * already has, so deep links and reloads work. The `.nojekyll` marker stops Pages from
 * running the output through Jekyll, which would drop files whose names begin with `_`.
 */
import {spawnSync} from 'node:child_process';
import {copyFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const repository = process.env['GITHUB_REPOSITORY']?.split('/')[1];
const baseHref = process.env['BASE_HREF'] ?? `/${repository ?? 'psm'}/`;
const output = 'dist/psm/browser';

console.log(`building with base href ${baseHref}`);
const build = spawnSync('ng', ['build', '--base-href', baseHref], {stdio: 'inherit', shell: true});
if (build.status !== 0) {
	process.exit(build.status ?? 1);
}

await copyFile(join(output, 'index.html'), join(output, '404.html'));
await writeFile(join(output, '.nojekyll'), '');
console.log(`prepared ${output}: 404.html fallback and .nojekyll written`);
