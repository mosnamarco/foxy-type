import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;
const ADDR = 'localhost';

const server = createServer((req, res) => {
  let filePath = path.join('./app', req.url === '/' ? 'index.html' : req.url);

  let contentType = '';

  switch (path.extname(req.url)) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      return res.end(`<h1>Error occured: ${err.errno}</h1>`);
    }
    res.writeHead(200, {'Content-Type': contentType});
    return res.end(data);
  })
});

server.listen(PORT, ADDR, () => {
  console.log(`Listening on http://${PORT}:${ADDR}/`);
});
