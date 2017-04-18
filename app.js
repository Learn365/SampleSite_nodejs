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
var winston = require("winston");
var expressWinston = require("express-winston");

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

// register request logger
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: "logs/success.log"
        })
    ]
}));

//config routing
router(app);

// register request logger
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: "logs/error.log"
        })
    ]
}));

app.use(function(err, req, res, next) {
    res.render("error", { error: err });
});

app.listen(config.app.port, function() {
    console.log(`${pkg.name} is listening on port: ${config.app.port}`);
});