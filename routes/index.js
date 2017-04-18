module.exports = function(app) {
    app.get("/", function(req, res) {
        res.redirect("/gits");
    });

    app.use("/gits", require("./gits"));

    // 404
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.status(404).render("404");
        }
    });
};