// Serves dist/ while applying dist/_redirects with Netlify semantics, so the
// generated rules can be exercised with a real HTTP client before deploy.
// Forced rules (301!) are applied ahead of matching static files.
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain',
};

const rules = readFileSync('dist/_redirects', 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, code] = l.split(/\s+/);
    return { from, to, status: parseInt(code, 10) || 301, force: /!$/.test(code || '') };
  });

const norm = (p) => (p !== '/' ? p.replace(/\/+$/, '') : p);

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = norm(decodeURIComponent(url.pathname));

  const rule = rules.find((r) => norm(r.from) === path);
  if (rule && rule.force) {
    res.writeHead(rule.status, { Location: rule.to });
    return res.end();
  }

  let file = join('dist', path);
  try { if (statSync(file).isDirectory()) file = join(file, 'index.html'); } catch { /* fall through */ }
  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    return res.end(body);
  } catch { /* not a file */ }

  if (rule) {
    res.writeHead(rule.status, { Location: rule.to });
    return res.end();
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
});

const port = Number(process.env.PORT || 4399);
server.listen(port, () => console.log(`redirect server on http://localhost:${port} (${rules.length} rules)`));
