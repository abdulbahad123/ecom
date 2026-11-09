const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';
  if (reqUrl.endsWith('/')) reqUrl += 'index.html';

  let filePath = path.join(__dirname, decodeURIComponent(reqUrl));

  // If path is a directory, look for index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const ext = path.extname(reqUrl);
      // SPA Fallback: check if requested path is under /tamstar/
      if (reqUrl.startsWith('/tamstar')) {
        const tamstarIndex = path.join(__dirname, 'tamstar', 'index.html');
        if (fs.existsSync(tamstarIndex)) {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          });
          fs.createReadStream(tamstarIndex).pipe(res);
          return;
        }
      }

      // Root SPA Fallback
      if (!ext || ext === '.html') {
        const indexPath = path.join(__dirname, 'index.html');
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(indexPath).pipe(res);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Storify Local Server running at http://localhost:${PORT}/`);
});

