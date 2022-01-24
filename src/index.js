const express = require("express");
const morgan = require("morgan");
const path = require("path");
const lotto = require("./handlers/lotto");

const app = express().use(morgan("dev"));

app.use(express.static(__dirname + "/../public"));

app.get("/", (req, res) => res.end("home"));

app.get("/pick", lotto.handle_pick_request);

// generic route not found
// TODO: replace with better function
app.get("*", (req, res) => res.end("404: Route not found"));

app.listen(3000);
