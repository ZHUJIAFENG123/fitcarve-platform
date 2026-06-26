import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost');
  let filePath = path.join(__dirname, parsedUrl.pathname);

  if (filePath === __dirname || filePath.endsWith('/')) {
    filePath = path.join(__dirname, 'pages', 'news-list.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType + '; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    }
  });
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log('静态服务器运行在 http://localhost:' + PORT);
});