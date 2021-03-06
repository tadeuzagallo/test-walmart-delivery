var Map = require('../models/map');
var MapController = {};

MapController.create = function (req, res) {
  if (!checkAcceptsJson(req, res)) {
    return;
  }

  new Map(req.body.map).save(function (err) {
    if (!err) {
      res.status(201).json({message: 'Map created successfuly'});
    } else {
      res.status(422).json(err);
    }
  });
};

MapController.calculate = function (req, res) {
  if (!checkAcceptsJson(req, res)) {
    return;
  }

  var from = req.query.from;
  var to = req.query.to;
  var autonomy = req.query.autonomy;
  var literPrice = req.query.liter_price;

  if (!from || !to || !autonomy || !literPrice) {
    res.status(422)
      .json({ message: 'To calculate best route and price you need to specify: from, to, autonomy, liter_price' });
    return;
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
    }, {distance: -1});

    if (~shortestPath.distance) {
      res.json({
        cost: shortestPath.distance / autonomy * literPrice,
        path: shortestPath.path
      });
    } else {
      res.status(422)
        .json({ message: 'Unable to find a path' });
    }
  });
};

function checkAcceptsJson(req, res) {
  if (!~req.headers.accept.split(',').indexOf('application/json')) {
    res.send(406, 'Only json response is available and it seems to be unacceptable...');
    return false;
  }

  return true;
}

module.exports = MapController;
