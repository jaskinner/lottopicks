const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const lotto = require("./es6/scripts");

const siteName = "Client Portal - ";

app.use('/static', express.static(path.join(__dirname, "public")));

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());
app.set("view engine", "pug");
app.locals.basedir = path.join(__dirname, "public");

app.get("/", (req, res) => {
  res.render("index", { title: siteName + "Home" });
});

app.get("/picks/:tix", (req, res) => {
  var picks = lotto.getMyPicks(req.params.tix);
  var test = lotto.checkPicksStats(picks);
  res.render("picks", { title: siteName + "Picks", picks: picks, test: test })
});

app.get("/draw/:draw", (req, res) => {
  var test = lotto.checkPicksStats(req.params.draw);
  res.render("draw", { title: siteName + "Draw", draw: req.params.draw, test: test })
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
