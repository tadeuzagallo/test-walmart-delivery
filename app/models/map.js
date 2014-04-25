var mongoose = require('mongoose'),
    Route = require('./route'),
    Graph = require('../lib/graph');

var mapSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  routes: { type: [Route.schema], required: true }
});

var Map = mongoose.model('Map', mapSchema);

Map.prototype.shortestPath = function (from, to) {
  var graph = new Graph();

  this.routes.forEach(function (route) {
    graph.addEdge(route.from, route.to, route.distance);
  });

  return graph.shortestPath(from, to);
};

module.exports = Map;
