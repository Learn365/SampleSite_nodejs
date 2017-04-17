var express = require("express");
var app = express();
var indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen("8080");