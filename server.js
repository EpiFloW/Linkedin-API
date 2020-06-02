var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
var server = express();
var db = require('./models')

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    server.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

server.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Linkedin API</h1>');
})

server.use('/api/', apiRouter);

db.sequelize.sync({force: true}).then(function(){
  server.listen(8080, function() {
    console.log('Server start');
  });
})
