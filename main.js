const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const lotto = require("./scripts");

const siteName = "Client Portal - ";

dotenv.config();
const port = process.env.PORT;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.options("*", cors());
app.set("view engine", "pug");
app.locals.basedir = path.join(__dirname, "public");

app.get("/", (req, res) => {
  res.render("index", { title: siteName + "Home" });
});

app.get("/picks/:tix", (req, res) => {
  var picks = lotto.getMyPicks(req.params.tix);
  res.render("picks", { title: siteName + "Picks", picks: picks })
});

// app.get("/pricing", (req, res) => {
//   res.render("pricing", { title: siteName + "Pricing" });
// });

// app.get("/faqs", (req, res) => {
//   res.render("faqs", { title: siteName + "FAQs" });
// });

// app.get("/features", (req, res) => {
//   res.render("features", { title: siteName + "Features" });
// });

// app.get("/about", (req, res) => {
//   res.render("about", { title: siteName + "About" });
// });

// app.get("/account", (req, res) => {
//   res.render("account", { title: siteName + "Account Home" });
// });

// app.get("/account/details", (req, res) => {
//   res.render("accountDetails", { title: siteName + "Account Details" });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
