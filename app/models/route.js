var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
});

var Route = mongoose.model('Route', routeSchema);

module.exports = Route;
