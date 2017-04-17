var app = {};
app.add = require('./actions/add').add;
app.find = require('./actions/find').find;
var mEdit = require('./actions/edit');
app.edit = mEdit.edit;
app.editWithEmail = mEdit.editWithEmail;
app.remove = require('./actions/remove').remove;

var http = require("http");
var fs = require("fs");
var qs = require("querystring");

// stores the git feeds
app.gits = [];

var server = http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.url);

    var url = qs.unescape(request.url);

    if (request.method === "GET") {
        switch (url) {
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
            case "/find":
            case "/remove":
                fs.readFile("." + url + ".html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;
            default:
                // check get query
                // find through Get
                var regex = new RegExp(/\/find\?email=/gi);
                if (regex.test(url)) {
                    var fEmail = url.substring(12);
                    app.find(request, response, app, fEmail, fs);
                }
                // edit through Get
                regex = new RegExp(/\/edit\?editEmail=/gi);
                if (regex.test(url)) {
                    var eEmail = url.substring(16);
                    app.editWithEmail(request, response, app, eEmail, fs);
                }

                // if unkown, responses 404
                fs.readFile("./404.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(404, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;
        }
    } else if (request.method === "POST") {
        switch (url) {
            case "/add":
                app.add(request, response, app, qs, fs);
                break;
            case "/edit":
                app.edit(request, response, app, qs, fs);
                break;

            case "/remove":
                app.remove(request, response, app, qs, fs);
                break;

            default:
                fs.readFile("./404.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(404, { "Content-type": "text/html" });
                    response.end(data.toString());
                });
                break;
        }

    } else {
        console.log("not supported");
    }
});

server.listen("8080");