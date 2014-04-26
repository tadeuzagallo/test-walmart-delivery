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

MapController.calculate = function (req, res) {
  var from = req.query.from;
  var to = req.query.to;
  var autonomy = req.query.autonomy;
  var literPrice = req.query.liter_price;

  if (!from || !to || !autonomy || !literPrice) {
    res.write(JSON.stringify({ message: 'To calculate best route and price you need to specify: from, to, autonomy, liter_price' }));
    return res.end();
  }

  Map.find(function (err, maps) {
    var shortestPath = maps.map(function (m) {
      return m.shortestPath(from, to);
    }).reduce(function (a, b) {
      if (~a.distance) {
        if (~b.distance) {
          return a.distance < b.distance ? a : b;
        } else {
          return a;
        }
      } else {
        return b;
      }
    });

    if (~shortestPath.distance) {
      res.write(JSON.stringify({
        cost: shortestPath.distance / autonomy * literPrice,
        path: shortestPath.path
      }));
    } else {
      res.write(JSON.stringify({ message: 'Unable to find a path' }));
    }

    res.end();
  });
};

module.exports = MapController;
