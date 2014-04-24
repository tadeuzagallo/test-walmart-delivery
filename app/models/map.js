var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

var Map = mongoose.model('Map', mapSchema);

module.exports = Map;
