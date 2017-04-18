module.exports = {
    add: function add(req, res, gits) {
        var git = {
            git: req.fields.git,
            name: req.fields.name,
            email: req.fields.email
        }
        gits.push(git);
        res.render("add", { gits: gits });
    },

    edit: function edit(req, res, gits) {
        // init email parameter
        var oEmail = req.query.email;
        var git = {
            git: req.fields.git,
            name: req.fields.name,
            email: req.fields.email
        };

        var index = gits.findIndex(function(g) {
            return g.email === oEmail;
        });

        if (index >= 0) {
            gits.splice(index, 1);
            gits.push(git);
            // update oEmail to the latest
            oEmail = git.email;
            res.redirect(302, "/gits/edit?email=" + oEmail);
        } else {
            var error = "NOT EXISTS";
            res.render("edit", { git: git, oEmail: oEmail, error: error });
        }
    },

    editWithEmail: function editWithEmail(req, res, gits, oEmail) {
        var git = gits.find(function(g) {
            return g.email === oEmail;
        });
        if (git) {
            res.render("edit", { git: git, oEmail: oEmail, error: null });
        } else {
            res.render("edit", { git: { git: "", name: "", email: "" }, oEmail: oEmail, error: "NOT EXISTS" });
        }
    },

    find: function find(req, res, gits, email) {
        var git = gits.find(function(g) {
            return g.email === email;
        });

        var error = null;
        if (!git) {
            error = "Nothing found";
        }

        res.render("find", { git: git, error: error });
    },
    remove: function remove(req, res, gits) {
        // acquire email
        var email = req.fields.email;

        var index = gits.findIndex(function(g) {
            return g.email === email;
        });

        if (index >= 0) {
            gits.splice(index, 1);
            res.redirect(302, "/");
        } else {
            res.render("remove", { email: email, error: "NOT EXISTS" });
        }
    }
};