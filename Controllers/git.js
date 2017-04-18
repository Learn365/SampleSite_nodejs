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

<<<<<<< HEAD
    edit: function edit(req, res, gits, qs) {
=======
    edit: function edit(request, response, app, qs, fs) {
>>>>>>> master
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

<<<<<<< HEAD
    editWithEmail: function editWithEmail(req, res, gits, oEmail) {
        var git = gits.find(function(g) {
            return g.email === oEmail;
=======
    editWithEmail: function editWithEmail(request, response, app, email, fs) {
        var git = app.gits.find(function(g) {
            return g.email === email;
        });


        fs.readFile("./edit.html", function(err, data) {
            if (err) throw err;

            var content = data.toString();
            content = content.replace(/<a\shref="\/find\?email=.*?"\stitle="find">/gi, "<a href=\"/find?email=" + git.email + "\" title=\"find\">");
            content = content.replace(/<input\stype="hidden"\svalue=".*?"\sname="oEmail"><\/input>/gi, "<input type=\"hidden\" value=\"" + git.email + "\" name=\"oEmail\"></input>");
            response.writeHead(200, { "content-type": "text/html" });
            response.end(content);
>>>>>>> master
        });
        if (git) {
            res.render("edit", { git: git, oEmail: oEmail, error: null });
        } else {
            res.render("edit", { git: { git: "", name: "", email: "" }, oEmail: oEmail, error: "NOT EXISTS" });
        }
    },

<<<<<<< HEAD
    find: function find(req, res, gits, email, fs) {
        var git = gits.find(function(g) {
=======
    find: function find(request, response, app, email, fs) {
        var git = app.gits.find(function(g) {
>>>>>>> master
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
<<<<<<< HEAD

    remove: function remove(req, res, gits, qs) {
=======
    remove: function remove(request, response, app, qs, fs) {
>>>>>>> master
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