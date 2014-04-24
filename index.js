var express = require('express'),
    app = express(),
    routes = require('./app/routes'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/delivery');

app.use(routes);
app.listen(8080);
