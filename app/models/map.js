var mongoose = require('mongoose'),
    Route = require('./route');

var mapSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  routes: { type: [Route.schema], required: true }
});

var Map = mongoose.model('Map', mapSchema);

module.exports = Map;
