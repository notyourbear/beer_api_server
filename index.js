require("dotenv").config();

const http = require("http");
const app = require("./server");
const config = require("./config");

const server = http.createServer(app);
const port = process.env.PORT || config.PORT;

server.listen(port, () => console.log(`Server listening on port ${port}`));
