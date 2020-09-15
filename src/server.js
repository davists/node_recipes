const restify = require('restify');
const fetch = require("node-fetch");
const server = restify.createServer();
const service  = require('./recipe-service');

server.get('/recipes/:ingredients',(req, res, next)=>{

    service.Recipe.getAll(req.params.ingredients).then(recipes=>{
        res.send(recipes);
        next();
    }).catch(error => { throw error})

    
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
