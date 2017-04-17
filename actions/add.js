function add(request, response, gits, qs, fs) {
    var formData = "";
    request.on("data", function(chunk) {
        formData += chunk;
    });

    request.on("end", function() {
        var git = qs.parse(formData);
        gits.push(git);
        var reshtml = "<table>";
        reshtml += "<tr><th>git</th><th>name</th><th>email</th></tr>";
        for (var i = 0; i < gits.length; i++) {
            reshtml += "<tr>";
            reshtml += "<td>" + gits[i].git + "</td>";
            reshtml += "<td>" + gits[i].name + "</td>";
            reshtml += "<td>" + gits[i].email + "</td>";
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
}

module.exports.add = add;