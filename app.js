var path = require("path");
var express = require("express");
var app = express();
var indexRouter = require("./routes/index");

// config the dir for locating the templates
app.set("views", path.join(__dirname, "views"));
// config the template engine
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen("8080");