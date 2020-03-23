var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

var server = express();

server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());

// Routes
server.get('/', function(req, res) {
    res.status(200).send('<p>Test</p>');
    res.setHeader('Content-Type', 'text/html');
});

server.use('/ api/', apiRouter);

server.listen(8080, function() {
    console.log('Server launch');
})