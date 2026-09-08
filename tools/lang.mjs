/** Switches the interface language and checks that the data labels follow. */
import puppeteer from 'puppeteer';

const base = process.env['SMOKE_BASE'] ?? 'http://localhost:4200';
const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
const page = await browser.newPage();
await page.setViewport({width: 1500, height: 1000, deviceScaleFactor: 2});
const problems = [];
page.on('console', message => {
	if (message.type() === 'error' && !/favicon|development mode|DevTools/iu.test(message.text())) {
		problems.push(message.text());
	}
});
page.on('pageerror', error => problems.push(error.stack ?? error.message));

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
await page.goto(`${base}/products?applicationAreas=code%2Fdb593bef-4b43-4292-addc-a1a23b201e0a`, {waitUntil: 'networkidle2'});
await wait(4500);

for (const language of ['fr', 'it', 'de']) {
	await page.click('#ob-language-dropdown');
	await wait(500);
	const clicked = await page.evaluate(lang => {
		const option = [...document.querySelectorAll('mat-option')].find(
			element => element.textContent?.trim().toLowerCase() === lang
		);
		option?.click();
		return !!option;
	}, language);
	await wait(2500);
	const labels = await page.evaluate(() =>
		[...document.querySelectorAll('.search-facets mat-label')]
			.map(label => label.textContent?.trim())
			.slice(0, 4)
			.join(' | ')
	);
	console.log(`${language}: clicked=${clicked} ${labels}`);
	await page.screenshot({path: `tools/screenshots/lang-${language}.png`});
}

await browser.close();
for (const problem of problems) {
	console.log(`   ${problem}`);
}
process.exit(problems.length ? 1 : 0);
