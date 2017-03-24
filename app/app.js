var http = require("http");
var fs = require("fs");

var server = http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.url);

    if (request.method === "GET") {
        var html = "";
        switch (request.url) {
            case "/index.html":
            case "/":
            case "index":
                fs.readFile("./index.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, { "Content-type": "text/html" });
                    response.write(data);
                    response.end();
                });
                break;

            case "/add.html":
            case "/edit.html":
            case "/delete.html":
            case "/find.html":
                fs.readFile("." + request.url, function(err, data) {
                    if (err) throw err;
                    response.writeHead(200, { "Content-type": "text/html" });
                    response.write(data);
                    response.end();
                });
                break;
            default:
                fs.readFile("./404.html", function(err, data) {
                    if (err) throw err;
                    response.writeHead(404, { "Content-type": "text/html" });
                    response.write(data);
                    response.end();
                });
                break;
        }
    } else {
        console.log("not supported");
    }
});

server.listen("80");