function remove(request, response, gits, qs, fs) {
    'use strict';
    // acquire email
    var formdata = "";
    request.on("data", function(chunk) {
        formdata += chunk;
    });

    // remove the git entry form the collection
    request.on("end", function() {
        var email = qs.parse(formdata).removeEmail;

        var index = gits.findIndex(function(g) {
            return g.email === email;
        });

        gits.splice(index, 1);

        response.writeHead(302, { "Location": "/find" });
        response.end();
    });

}

module.exports.remove = remove;