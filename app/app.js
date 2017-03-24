var http = require("http");
var fs = require("fs");
var qs = require("querystring");

// stores the git feeds
var gits = [];

var server = http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.url);

    if (request.method === "GET") {
        switch (request.url) {
            case "/index":
            case "/":
            case "index":
                fs.readFile("./index.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;

            case "/add":
            case "/edit":
            case "/delete":
            case "/find":
                fs.readFile("." + request.url + ".html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;
            default:
                fs.readFile("./404.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(404, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;
        }
    } else if (request.method === "POST") {
        var formData = "";
        switch (request.url) {
            case "/add":

                request.on("data", function(chunk) {
                    formData += chunk;
                    // console.log("data: " + chunk);
                });

                request.on("end", function() {
                    // console.log("end: " + formData);
                    var git = qs.parse(formData);
                    console.log("add: 1, " + JSON.stringify(git).toString());
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
                        response.writeHead(200, { "Content-type": "text/html" });
                        response.end(content);
                    });
                });

                break;
            case "/edit":
                break;

            case "/delete":
                break;

            default:
                break;
        }

    } else {
        console.log("not supported");
    }
});

server.listen("80");