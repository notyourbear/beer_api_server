require("dotenv").config();

const http = require("http");
const app = require("./server");
const config = require("./config");

const server = http.createServer(app);

server.listen(process.env.PORT || config.DEFAULT_PORT, () => {
  console.log("Server listening on port 4200");
});
