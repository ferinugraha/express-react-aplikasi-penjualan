
require("dotenv").config()
const http = require("node:http");
const { app } = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env

const port = API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
