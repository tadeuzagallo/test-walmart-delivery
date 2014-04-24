var express = require('express'),
    app = module.exports = express();
    IndexController = require('./controllers/index');

app.get('/', IndexController.index);
