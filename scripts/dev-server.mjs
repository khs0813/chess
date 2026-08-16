import { createReadStream, existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';

if (!existsSync(join(dist, 'index.html'))) {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  const clean = normalize(decoded).replace(/^([/\\])+/, '');
  const target = resolve(dist, clean);
  if (target !== dist && !target.startsWith(`${dist}${sep}`)) return null;
  return target;
}

function resolveFile(urlPath) {
  const target = safePath(urlPath);
  if (!target) return null;
  if (existsSync(target) && statSync(target).isFile()) return target;
  if (existsSync(target) && statSync(target).isDirectory()) {
    const index = join(target, 'index.html');
    if (existsSync(index)) return index;
  }
  if (!extname(target)) {
    const asHtml = `${target}.html`;
    if (existsSync(asHtml)) return asHtml;
    const asDirectory = join(target, 'index.html');
    if (existsSync(asDirectory)) return asDirectory;
  }
  return null;
}

const server = createServer(async (request, response) => {
  const method = request.method || 'GET';
  if (!['GET', 'HEAD'].includes(method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  const pathname = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`).pathname;
  const file = resolveFile(pathname);
  const cacheControl = pathname.startsWith('/assets/')
    ? 'public, max-age=3600'
    : 'no-cache';

  if (!file) {
    const notFound = join(dist, '404.html');
    const body = existsSync(notFound) ? await readFile(notFound) : Buffer.from('Not Found');
    response.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    if (method === 'HEAD') response.end();
    else response.end(body);
    return;
  }

  const contentType = pathname === '/rss.xml'
    ? 'application/rss+xml; charset=utf-8'
    : contentTypes[extname(file)] || 'application/octet-stream';

  response.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': cacheControl,
    'X-Content-Type-Options': 'nosniff'
  });
  if (method === 'HEAD') response.end();
  else createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`ChessStep preview: http://${host}:${port}`);
  console.log('Press Ctrl+C to stop.');
});

function shutdown() {
  server.close(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
