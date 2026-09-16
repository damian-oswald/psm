/**
 * Interaction test.
 *
 * Drives the pages the way a user would — typing a search, selecting a facet, loading a
 * query example and running it — and fails on any console error along the way. Screenshots
 * are written to tools/screenshots for a visual check.
 */
import puppeteer from 'puppeteer';
import {mkdirSync} from 'node:fs';

const base = process.env['SMOKE_BASE'] ?? 'http://localhost:4200';
const shots = 'tools/screenshots';
mkdirSync(shots, {recursive: true});

const IGNORED = [/favicon/iu, /Angular is running in development mode/iu, /Download the Angular DevTools/iu];
const problems = [];
/**
 * The document of the page being visited.
 *
 * Served from GitHub Pages a deep link answers with `404.html` and a 404 status, which is
 * how the application boots there, so the browser's complaint about that one response is
 * expected. Any other failing request is a fault.
 */
let document = '';
const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width: 1500, height: 1000, deviceScaleFactor: 2});
page.on('console', message => {
	if (message.type() !== 'error' || IGNORED.some(pattern => pattern.test(message.text()))) {
		return;
	}
	if (message.location().url === document) {
		return;
	}
	problems.push(`console: ${message.text()}`);
});
page.on('pageerror', error => problems.push(`exception: ${error.stack ?? error.message}`));

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const visit = async path => {
	document = `${base}${path}`;
	await page.goto(document, {waitUntil: 'networkidle2', timeout: 60000});
};
const step = async (name, action) => {
	const before = problems.length;
	await action();
	await page.screenshot({path: `${shots}/step-${name}.png`, fullPage: true});
	console.log(`${problems.length > before ? 'FAIL' : ' OK '}  ${name}`);
};

await step('01-search-loaded', async () => {
	await visit(`/products`);
	await wait(4000);
});

await step('02-search-text', async () => {
	await page.type('input[name="query"]', 'karate');
	await wait(800);
});

await step('03-search-facet', async () => {
	await page.evaluate(() => {
		document.querySelector('input[name="query"]').value = '';
	});
	await page.click('button[aria-label], body');
	await visit(`/products?statuses=authorised`);
	await wait(3500);
});

await step('04-crop-dropdown', async () => {
	const selects = await page.$$('app-term-dropdown mat-select');
	await selects[0].click();
	await wait(700);
	// A panel with more than a handful of options carries its own field to narrow them down.
	await page.type('.term-search input', 'Winterweizen');
	await wait(700);
});

await step('05-crop-selected', async () => {
	await page.evaluate(() => document.querySelector('mat-option').click());
	await wait(600);
	await page.keyboard.press('Escape');
	await wait(900);
	const fields = await page.evaluate(() =>
		[...document.querySelectorAll('app-term-dropdown .mat-mdc-select-value')].map(value =>
			value.textContent.trim().replace(/\s+/gu, ' ')
		)
	);
	const badges = await page.evaluate(() =>
		[...document.querySelectorAll('.search-badges mat-chip')].map(chip => chip.textContent.trim().replace(/\s+/gu, ' '))
	);
	console.log(`        fields: ${JSON.stringify(fields)}`);
	console.log(`        active filters: ${JSON.stringify(badges)}`);
});

await step('06-detail', async () => {
	await visit(`/products/W-6880`);
	await wait(3500);
});

await step('07-detail-expanded', async () => {
	const button = await page.$('.detail-expand');
	if (button) {
		await button.click();
	}
	await wait(600);
});

await step('08-query-criteria', async () => {
	await visit(`/query`);
	// The form only renders once the registry has loaded, which can take a while.
	await page.waitForSelector('app-term-dropdown mat-select', {timeout: 60000});
	await wait(1000);
	const fields = await page.$$('app-term-dropdown');
	const choose = async (field, text) => {
		await (await field.$('mat-select')).click();
		await wait(700);
		await page.type('.term-search input', text);
		await wait(600);
		await page.evaluate(() => document.querySelector('mat-option:not(.mdc-list-item--disabled)').click());
		await wait(500);
		await page.keyboard.press('Escape');
		await wait(600);
	};
	// Two crops, which must both be met: the AND/OR switch becomes available with the second.
	await choose(fields[0], 'Winterweizen');
	await choose(fields[0], 'Wintergerste');
	const combination = await page.evaluate(() => {
		const group = document.querySelector('app-term-dropdown mat-button-toggle-group');
		const checked = group.querySelector('.mat-button-toggle-checked')?.textContent.trim();
		return `${checked}, ${group.classList.contains('mat-button-toggle-group-disabled') ? 'disabled' : 'enabled'}`;
	});
	console.log(`        crops combine with: ${combination}`);
	// The dropdowns offer only what is still reachable under the criteria already set.
	const offered = await page.evaluate(() => {
		const sections = [...document.querySelectorAll('.query-section')];
		return sections.map(section => section.querySelector('legend').textContent.trim());
	});
	console.log(`        sections: ${JSON.stringify(offered)}`);
});

await step('09-query-run', async () => {
	await page.click('button[type="submit"]');
	await wait(4000);
	const count = await page.evaluate(() => document.querySelector('.query-count')?.textContent?.trim() ?? '');
	console.log(`        ${count}`);
	// The generated query is a secondary control, revealed only once there is a result.
	await page.click('.query-sparql-toggle');
	await wait(600);
});

await step('10-about', async () => {
	await visit(`/about`);
	await wait(2500);
});

await browser.close();

for (const problem of problems) {
	console.log(`   ${problem}`);
}
process.exit(problems.length ? 1 : 0);
