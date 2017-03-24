function find(request, response, app, email, fs) {
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
}

module.exports.find = find;