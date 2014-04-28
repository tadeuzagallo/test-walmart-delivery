var express = require('express'),
    app = express(),
    routes = require('./app/routes'),
    mongoose = require('mongoose'),
    logger = require('morgan');

mongoose.connect('mongodb://localhost/delivery');

port = process.argv[2] || 8080;

app.use(logger())
  .use(routes)
  .listen(port);

console.log('Server listening on http://localhost:%s', port);
