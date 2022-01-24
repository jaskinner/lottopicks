const express = require("express");
const app = express();
const path = require("path");
const lotto = require("./handlers/lotto");

app.use(express.static(__dirname + "/../public"));

app.get("/", lotto.handle_pick_request);

app.get("/picks/:tix", lotto.handle_pick_request);

// generic route not found
// TODO: replace with better function
// app.get("*", (req, res) => res.end("404: Route not found"));

app.listen(3000);
