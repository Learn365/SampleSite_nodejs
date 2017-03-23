var http = require("http");

var server = http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.url);

    if (request.method === "GET") {
        switch (request.url) {
            case "/index.html":
            case "/":
            case "index":
                break;

            case "/add.html":
                break;

            case "/edit.html":
                break;

            case "/delete.html":
                break;

            case "/find.html":
                break;

            default:
                console.log("Invalid request: " + request.url);
                break;
        }
    }

    response.end();
});

server.listen("7798");