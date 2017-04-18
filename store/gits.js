// stores the git feeds
var store = {
    gits: []
};

// init
store.gits.push({
    git: "git@helloworld.git",
    name: "helloworld",
    email: "helloworld@git.com"
});
module.exports = store;