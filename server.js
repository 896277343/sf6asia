const { createServer } = require("http");
const next = require("next");

const port = Number.parseInt(process.env.PORT || "3008", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`SF6 catalogue ready on http://${hostname}:${port}`);
  });
});
