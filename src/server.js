var restify = require('restify');
var fetch = require("fetch").fetch;
var server = restify.createServer();

function get_recipes(req, res, next) {
    var recipes;
    var fetchUrl = require("fetch").fetchUrl;

    fetchUrl('http://www.recipepuppy.com/api/?i=' + req.params.ingredients, function(error, meta, body){
        recipes = JSON.parse(body.toString())
        res.send(recipes);
        next();
    });
}


server.get('/recipes/:ingredients', get_recipes);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});