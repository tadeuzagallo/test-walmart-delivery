var express = require('express'),
    app = module.exports = express();
    IndexController = require('./controllers/index'),
    MapController = require('./controllers/map');

app.get('/', IndexController.index);
app.post('/map', MapController.create);
app.get('/map/calculate', MapController.calculate);
