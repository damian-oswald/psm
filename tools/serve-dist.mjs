/**
 * Serves the production build the way GitHub Pages does.
 *
 * The output is mounted under a base path, unknown paths answer with `404.html` and a 404
 * status rather than with `index.html` and a 200, and nothing is rewritten. Testing
 * against this rather than against a forgiving dev server is what catches a wrong base
 * href or a deep link that only works because the server was too helpful.
 */
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname, join, normalize} from 'node:path';

const root = process.env['DIST_ROOT'] ?? 'dist/psm/browser';
const base = process.env['DIST_BASE'] ?? '';
const port = Number(process.env['DIST_PORT'] ?? 4300);

const types = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.ico': 'image/x-icon',
	'.gif': 'image/gif',
	'.woff2': 'font/woff2'
};

createServer(async (request, response) => {
	const path = normalize(decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
	if (base && !path.startsWith(base)) {
		response.writeHead(404).end();
		return;
	}
	const relative = base ? path.slice(base.length) : path;
	try {
		const body = await readFile(join(root, relative));
		response.writeHead(200, {'Content-Type': types[extname(relative)] ?? 'application/octet-stream'});
		response.end(body);
	} catch {
		try {
			const notFound = await readFile(join(root, '404.html'));
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end(notFound);
		} catch {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('404');
		}
	}
}).listen(port, () => console.log(`serving ${root} at http://localhost:${port}${base}/`));
