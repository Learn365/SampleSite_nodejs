var http = require("http");

var server = http.createServer(function(request, response) {
    console.log(request.method);
    console.log(request.url);

    if (request.method === "GET") {
        switch (request.url) {
            case "/index.html":
            case "/":
            case "index":
                var html="<html>";
                html+="<title>Hello World</title>";
                html+="<body>";
                html+="<h1>Hello World</h1>";
                html+"<ul>";
                html+="<li><a href='add.html'>Add</a></li>";
                html+="<li><a href='edit.html'>Edit</a></li>";
                html+="<li><a href='find.html'>Find</a></li>";
                html+="<li><a href='delete.html'>Delete</a></li>";
                html+="</ul>";
                html+="</body>";
                html+="</html>";
                response.write(html);
                break;

            case "/add.html":
                var html="<html>";
                html+="<title>Hello World</title>";
                html+="<body>";
                html+="Add";
                html+="</body>";
                html+="</html>";
                response.write(html);
                break;

            case "/edit.html":
                var html="<html>";
                html+="<title>Hello World</title>";
                html+="<body>";
                html+="Edit";
                html+="</body>";
                html+="</html>";
                response.write(html);
                break;

            case "/delete.html":
                var html="<html>";
                html+="<title>Hello World</title>";
                html+="<body>";
                html+="Delete";
                html+="</body>";
                html+="</html>";
                response.write(html);
                break;

            case "/find.html":
                var html="<html>";
                html+="<title>Hello World</title>";
                html+="<body>";
                html+="Find";
                html+="</body>";
                html+="</html>";
                response.write(html);
                break;

            default:
                console.log("Invalid request: " + request.url);
                break;
        }
    }

    response.end();
});

server.listen("7790");
