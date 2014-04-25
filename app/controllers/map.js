var Map = require('../models/map');
var MapController = {};

MapController.create = function (req, res) {
  var map = new Map(req.params.map);

  map.save(function (err) {
    if (!err) {
      res.write('{"message":"Map created successfuly"}');
    } else {
      res.write(JSON.stringify(err));
    }

    res.end();
  });
};

module.exports = MapController;
