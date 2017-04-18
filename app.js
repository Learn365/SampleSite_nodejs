var flash = require("connect-flash");
var config = require("config-lite")({
    filename: "default",
    config_basedir: __dirname,
    config_dir: "config"
});
var pkg = require("./package");
var session = require("express-session");
var path = require("path");
var express = require("express");
var app = express();
var router = require("./routes/index");

// config the dir for locating the templates
app.set("views", path.join(__dirname, "views"));
// config the template engine
app.set("view engine", "ejs");

// config flash
app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: config.session.cookie.maxAge }
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

app.listen(config.app.port, function() {
    console.log(`${pkg.name} is listening on port: ${config.app.port}`);
});