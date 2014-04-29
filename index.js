var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    app = express();

mongoose.connect('mongodb://localhost/delivery');

port = process.argv[2] || 8080;

app.use(bodyParser.urlencoded())
  .use(logger())
  .use(routes)
  .listen(port);

console.log('Server listening on http://localhost:%s', port);
