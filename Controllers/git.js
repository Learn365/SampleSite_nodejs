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

            if (index) {
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

    find: function find(req, res, gits, email, fs) {
        var git = gits.find(function(g) {
            return g.email === email;
        });

        var reshtml = "";
        if (git) {
            reshtml += "<table>" +
                "<tr>" +
                "<td>Git: </td><td>" + git.git + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Name: </td><td>" + git.name + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Email: </td><td>" + git.email + "</td>" +
                "</tr>" +
                "</table>" +
                "<form action=\"/edit\" method=\"GET\">" +
                "<input type=\"hidden\" name=\"email\" value=\"" + git.email + "\"></input>" +
                "<input type=\"submit\" value=\"Edit\"></input>" +
                "</form>" +
                "<form action=\"/remove\" method=\"POST\">" +
                "<input type=\"hidden\" name=\"email\" value=\"" + git.email + "\"></input>" +
                "<input type=\"submit\" value=\"Remove\"></input>" +
                "</form>";
        } else {
            reshtml = "Nothing found";
        }

        fs.readFile("./find.html", function(err, data) {
            if (err) throw err;

            var content = data.toString();
            content = content.replace(/<section\sid="resFind">\s*<\/section>/gi, reshtml);
            res.writeHead(200, { "content-type": "text/html" });
            res.end(content);
        });
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

            gits.splice(index, 1);

            res.writeHead(302, { "Location": "/find" });
            res.end();
        });
    }
};