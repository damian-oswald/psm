/**
 * Headless smoke test.
 *
 * Loads a list of routes in a real browser against the dev server, waits for the page to
 * settle, and fails on any console error, failed request or uncaught exception. It exists
 * because an ahead-of-time build catches neither a broken signal graph nor a malformed
 * SPARQL query, both of which only surface at runtime.
 */
import puppeteer from 'puppeteer';
import {mkdirSync} from 'node:fs';

const base = process.env['SMOKE_BASE'] ?? 'http://localhost:4200';
const shots = 'tools/screenshots';
const routes = process.argv.slice(2);
const targets = routes.length ? routes : ['/products', '/query', '/about'];

/** Console noise that says nothing about the application's health. */
const IGNORED = [/favicon/iu, /Angular is running in development mode/iu, /Download the Angular DevTools/iu];

mkdirSync(shots, {recursive: true});

const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
let failures = 0;

for (const route of targets) {
	const page = await browser.newPage();
	await page.setViewport({width: 1500, height: 1100, deviceScaleFactor: 2});
	const problems = [];
	page.on('console', async message => {
		if (message.type() !== 'error' || IGNORED.some(pattern => pattern.test(message.text()))) {
			return;
		}
		if (message.location().url === `${base}${route.split('|')[0]}`) {
			return;
		}
		const details = await Promise.all(
			message.args().map(arg => arg.evaluate(value => (value instanceof Error ? value.stack : String(value))).catch(() => ''))
		);
		problems.push(`console: ${details.filter(Boolean).join(' | ') || message.text()}`);
	});
	page.on('pageerror', error => problems.push(`exception: ${error.stack ?? error.message}`));
	page.on('requestfailed', request => problems.push(`request failed: ${request.url()}`));

	const [path, wait = '3000'] = route.split('|');
	const target = `${base}${path}`;
	// GitHub Pages answers a deep link with 404.html and a 404 status, which is how the
	// application boots there. Only the document itself may do that; anything else is a fault.
	page.on('response', response => {
		if (response.status() >= 400 && response.url() !== target) {
			problems.push(`${response.status()} ${response.url()}`);
		}
	});
	await page.goto(target, {waitUntil: 'networkidle2', timeout: 60000});
	await new Promise(resolve => setTimeout(resolve, Number(wait)));

	const name = path.replace(/[^a-z0-9]+/giu, '-').replace(/^-|-$/gu, '') || 'root';
	// The viewport only: a full-page capture of the detail view runs to some 13000 pixels
	// and has crashed the browser's screenshot call.
	await page.screenshot({path: `${shots}/${name}.png`});

	const heading = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim() ?? '(no h1)');
	console.log(`${problems.length ? 'FAIL' : ' OK '}  ${path}  ${heading}`);
	for (const problem of problems) {
		console.log(`        ${problem}`);
	}
	failures += problems.length ? 1 : 0;
	await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
