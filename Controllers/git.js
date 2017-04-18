module.exports = {
    add: function add(req, res, gits, qs) {
        var formData = "";
        req.on("data", function(chunk) {
            formData += chunk;
        });

        req.on("end", function() {
            var git = qs.parse(formData);
            gits.push(git);
            res.render("add", { gits: gits });
        });
    },

    edit: function edit(req, res, gits, qs) {
        var formdata = "";
        req.on("data", function(chunk) {
            formdata += chunk;
        });

        // remove the git entry form the collection
        req.on("end", function() {
            var data = qs.parse(formdata);
            var oEmail = req.query.email;
            var git = {
                git: data.git,
                name: data.name,
                email: data.email
            };

            var index = gits.findIndex(function(g) {
                return g.email === oEmail;
            });

            if (index && index > 0) {
                gits.splice(index, 1);
                gits.push(git);
                // update oEmail to the latest
                oEmail = git.email;
                res.redirect(302, "/edit?email=" + oEmail);
            } else {
                var error = "NOT EXISTS";
                res.render("edit", { git: git, oEmail: oEmail, error: error });
            }

        });
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
    remove: function remove(req, res, gits, qs) {
        // acquire email
        var formdata = "";
        req.on("data", function(chunk) {
            formdata += chunk;
        });

        // remove the git entry form the collection
        req.on("end", function() {
            var email = qs.parse(formdata).removeEmail;

            var index = gits.findIndex(function(g) {
                return g.email === email;
            });

            if (index && index > 0) {
                gits.splice(index, 1);
                res.redirect(302, "/");
            } else {
                res.render("remove", { email: email, error: "NOT EXISTS" });
            }
        });
    }
};