var express = require('express'),
    app = express(),
    routes = require('./app/routes');

app.use(routes);
app.listen(8080);
