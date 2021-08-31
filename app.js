// Use strict mode everywhere.
"use strict";

// Add required modules. Set up port for UI.

const port = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const score = require("./score");
const roll = require("./roll/");
const game = require("./game/");
const app = express();
const server = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// All backend APIs are here.
require("./api/")(score, roll, game, app);

// Set up frontend -folder to be public.
app.use("/", express.static(path.join(__dirname, "frontend")));

// All other calls to open up index.html.
app.all("/*", (req, res, next) => {
  console.log(Date() + " - " + req.method + ": " + req.url + ".");
  res.sendFile("frontend/index.html", { root: path.join(__dirname) });
});

// Server is listening.
server.listen(port);
console.log(Date() + " - Server is listening. Port: " + port);
