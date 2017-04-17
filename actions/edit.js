function edit(request, response, app, qs, fs) {
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

        // fs.readFile("./find.html", function(err, data) {
        //     if (err) throw err;
        //     response.writeHead(200, { "Content-type": "text/html" });
        //     response.end(data.toString());
        // });
    });

}

function editWithEmail(request, response, app, email, fs) {
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




}

module.exports.edit = edit;
module.exports.editWithEmail = editWithEmail;