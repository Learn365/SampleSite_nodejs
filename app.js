var flash = require("connect-flash");
var session = require("express-session");
// var cookieParser = require("cookie-parser");
var path = require("path");
var express = require("express");
var app = express();
var router = require("./routes/index");

// config the dir for locating the templates
app.set("views", path.join(__dirname, "views"));
// config the template engine
app.set("view engine", "ejs");

// config flash
// app.use(cookieParser("samplesite"));
app.use(session({
    secret: "samplesite",
    resave: true,
    saveUninitialized: false,
    key: "sid",
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use(require("express-formidable")());

// initial flash events to locals
app.use(function(req, res, next) {

    res.locals.info = req.flash("info").toString();
    res.locals.success = req.flash("success").toString();
    res.locals.error = req.flash("error").toString();

    next();
});

//config routing
router(app);

app.listen("8080");