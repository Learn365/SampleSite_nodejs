module.exports = {
    add: function add(req, res, gits) {
        var git = {
            git: req.fields.git,
            name: req.fields.name,
            email: req.fields.email
        }
        gits.push(git);
        req.flash("success", "Added Successfully");
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
            req.flash("success", "Updated Successfully");
            res.redirect(302, "/gits/edit?email=" + oEmail);
        } else {
            req.flash("error", "NOT EXISTS");
            res.render("edit", { git: git, oEmail: oEmail });
        }
    },

    editWithEmail: function editWithEmail(req, res, gits, oEmail) {
        var git = gits.find(function(g) {
            return g.email === oEmail;
        });
        if (git) {
            res.render("edit", { git: git, oEmail: oEmail });
        } else {
            req.flash("error", "NOT EXISTS")
            res.render("edit", { git: { git: "", name: "", email: "" }, oEmail: oEmail });
        }
    },

    find: function find(req, res, gits, email) {
        var git = gits.find(function(g) {
            return g.email === email;
        });

        if (!git) {
            req.flash("error", "NOTHING FOUND");
        }

        res.render("find", { git: git });
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
            req.flash("error", "NOT EXISTS");
            res.render("remove", { email: email });
        }
    }
};