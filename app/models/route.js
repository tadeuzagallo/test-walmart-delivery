var mongoose = require('mongoose');

try {
  module.exports = mongoose.model('Route');
  return;
} catch (e){}

var routeSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  distance: { type: Number, required: true }
});

var Route = mongoose.model('Route', routeSchema);

module.exports = Route;
