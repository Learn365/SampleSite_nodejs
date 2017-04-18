module.exports = {
    add: function add(request, response, app, qs, fs) {
        var formData = "";
        request.on("data", function(chunk) {
            formData += chunk;
        });

        request.on("end", function() {
            var git = qs.parse(formData);
            app.gits.push(git);
            var reshtml = "<table>";
            reshtml += "<tr><th>git</th><th>name</th><th>email</th></tr>";
            for (var i = 0; i < app.gits.length; i++) {
                reshtml += "<tr>";
                reshtml += "<td>" + app.gits[i].git + "</td>";
                reshtml += "<td>" + app.gits[i].name + "</td>";
                reshtml += "<td>" + app.gits[i].email + "</td>";
                reshtml += "</tr>";
            }
            reshtml += "</table>";

            fs.readFile("./add.html", function(err, data) {
                if (err) throw err;

                var content = data.toString();
                content = content.replace(/<section\sid="response">\s*<\/section>/gi, reshtml);
                response.writeHead(200, { "content-type": "text/html" });
                response.end(content);
            });
        });
    },

    edit: function edit(request, response, app, qs, fs) {
        'use strict';
        var formdata = "";
        request.on("data", function(chunk) {
            formdata += chunk;
        });

        // remove the git entry form the collection
        request.on("end", function() {
            var data = qs.parse(formdata);

            var git = {
                git: data.git,
                name: data.name,
                email: data.email
            };

            var index = app.gits.findIndex(function(g) {
                return g.email === data.oEmail;
            });

            app.gits.splice(index, 1);
            app.gits.push(git);

            response.writeHead(302, { "Location": "/edit?editEmail=" + git.email });
            response.end();
        });
    },

    editWithEmail: function editWithEmail(request, response, app, email, fs) {
        'use strict';
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
        });
    },

    find: function find(request, response, app, email, fs) {
        'use strict';
        var git = app.gits.find(function(g) {
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
            response.writeHead(200, { "content-type": "text/html" });
            response.end(content);
        });
    },
    remove: function remove(request, response, app, qs, fs) {
        'use strict';
        // acquire email
        var formdata = "";
        request.on("data", function(chunk) {
            formdata += chunk;
        });

        // remove the git entry form the collection
        request.on("end", function() {
            var email = qs.parse(formdata).removeEmail;

            var index = app.gits.findIndex(function(g) {
                return g.email === email;
            });

            app.gits.splice(index, 1);

            response.writeHead(302, { "Location": "/find" });
            response.end();
        });
    }
};