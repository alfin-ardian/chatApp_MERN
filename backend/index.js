require("dotenv").config();
require("./database/conn");
const express = require("express");
let favicon = require("serve-favicon");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const cors = require("cors");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 8080;

//to serve favicon
const messagesRouter = require("./routes/index");
app.use(favicon(__dirname + "/public/img/favicon.ico"));
app.use("/api", messagesRouter);

server.listen(port, () => {
  console.log("Listening on:", port);
});
