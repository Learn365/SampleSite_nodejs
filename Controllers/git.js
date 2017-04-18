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
        'use strict';
        var formdata = "";
        req.on("data", function(chunk) {
            formdata += chunk;
        });

        // remove the git entry form the collection
        req.on("end", function() {
            var data = qs.parse(formdata);

            var git = {
                git: data.git,
                name: data.name,
                email: data.email
            };

            var index = gits.findIndex(function(g) {
                return g.email === data.oEmail;
            });

            gits.splice(index, 1);
            gits.push(git);

            res.writeHead(302, { "Location": "/edit?editEmail=" + git.email });
            res.end();
        });
    },

    editWithEmail: function editWithEmail(req, res, gits, email, fs) {
        'use strict';
        var git = gits.find(function(g) {
            return g.email === email;
        });

        fs.readFile("./edit.html", function(err, data) {
            if (err) throw err;

            var content = data.toString();
            content = content.replace(/<a\shref="\/find\?email=.*?"\stitle="find">/gi, "<a href=\"/find?email=" + git.email + "\" title=\"find\">");
            content = content.replace(/<input\stype="hidden"\svalue=".*?"\sname="oEmail"><\/input>/gi, "<input type=\"hidden\" value=\"" + git.email + "\" name=\"oEmail\"></input>");
            res.writeHead(200, { "content-type": "text/html" });
            res.end(content);
        });
    },

    find: function find(req, res, gits, email, fs) {
        'use strict';
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
                "<input type=\"hidden\" name=\"editEmail\" value=\"" + git.email + "\"></input>" +
                "<input type=\"submit\" value=\"Edit\"></input>" +
                "</form>" +
                "<form action=\"/remove\" method=\"POST\">" +
                "<input type=\"hidden\" name=\"removeEmail\" value=\"" + git.email + "\"></input>" +
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
        'use strict';
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