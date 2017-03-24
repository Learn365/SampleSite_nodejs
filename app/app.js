var app = {};
app.add = require('../app/controller/add.js').add;

var http = require("http");
var fs = require("fs");
var qs = require("querystring");

// stores the git feeds
app.gits = [];

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
        switch (request.url) {
            case "/add":
                app.add(request, response, app, qs, fs);
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