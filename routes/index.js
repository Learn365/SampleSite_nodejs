var express = require("express");
var app = express();
var router = express.Router();

var controller = require("../controllers/git");
var qs = require("querystring");
var gits = require("../store/gits").gits;

// GET: / 
// home page
router.get("/", function(req, res) {
    res.render("index", { gits: gits });
});

// GET: /index
// display home page
router.get("/index", function(req, res) {
    res.render("index", { gits: gits });
});

// GET: /add
// display add page
router.get("/add", function(req, res) {
    res.render("add", { gits: gits });
});

// POST: /add
// add a git entry
router.post("/add", function(req, res) {
    controller.add(req, res, gits, qs);
});

// GET: /edit
// display edit page
router.get("/edit", function(req, res) {
    // GET: /edit?email=xxxx
    // edit with email
    if (req.query.email) {
        var oEmail = req.query.email;
        controller.editWithEmail(req, res, gits, oEmail);
    } else {
        res.render("edit", { git: { git: "", name: "", email: "" }, oEmail: "", error: "Email Unknown" });
    }
});

// POST: /edit
// edit a git entry
router.post("/edit", function(req, res) {
    controller.edit(req, res, gits, qs);
});

// GET: /find
// display find page
router.get("/find", function(req, res) {
    // GET: /find?email=xxxx
    // find git entry by email
    if (req.query.email) {
        var pEmail = req.query.email;
        controller.find(req, res, gits, pEmail);
    } else {
        res.render("find", { git: null, error: null });
    }
});

// GET: /remove
// display remove page
router.get("/remove", function(req, res) {
    var email = "";
    if (req.query.email) {
        email = req.query.email;
    }
    res.render("remove", { email: email, error: null });
});


// POST: /remove
// remove a git entry
router.post("/remove", function(req, res) {
    controller.remove(req, res, gits, qs);
});

module.exports = router;