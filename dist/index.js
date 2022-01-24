"use strict";

var express = require("express");

var app = express();
app.get('/', function (req, res) {
  return res.send('Sup');
});
app.listen(3000);