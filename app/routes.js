var express = require('express'),
    app = module.exports = express();
    index_controller = require('./controllers/index');

app.get('/', index_controller.index);
