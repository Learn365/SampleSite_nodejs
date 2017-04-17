function add(req, res, gits) {
    var strGit = req.fields.git;
    var name = req.fields.name;
    var email = req.fields.email;

    var git = {
        git: strGit,
        name: name,
        email: email
    }
    gits.push(git);

    res.render("add", { gits: gits });
}

module.exports.add = add;