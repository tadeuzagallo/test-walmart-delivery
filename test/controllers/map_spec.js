var MapController,
    Map = function () {},
    requireSubvert = require('require-subvert')(__dirname);

describe('MapController', function () {
  before(function () {
    requireSubvert.subvert('../../app/models/map', Map);
    MapController = requireSubvert.require('../../app/controllers/map')
  });

  after(function () {
    requireSubvert.cleanUp();
  });

  context('#create', function () {
    it('should create a new map', function (done) {
      Map.prototype.save = sinon.stub().callsArgWith(0, null);
      MapController.create({body:{}}, mockRes(201, 'created', done));
    });

    it('should output save errors', function (done) {
      var req = { body: {} };
      var error = '`name` is required';

      Map.prototype.save = sinon.stub().callsArgWith(0, {message: error})
      MapController.create(req, mockRes(422, error, done));
    });
  });

  context('#calculate', function () {
    it('should return route cost and path', function (done) {
      var autonomy = 10,
        literPrice = 2.5,
        req = { query: { 
          from: 'A',
          to: 'D',
          autonomy: autonomy,
          liter_price: literPrice
        }},
        distance = 25,
        path = ['A', 'B', 'D'],
        result = { cost: distance / autonomy * literPrice, path: path };

      Map.find = sinon.stub().callsArgWith(0, null, [new Map]);
      Map.prototype.shortestPath = sinon.stub().withArgs('A', 'D').returns({ distance: distance, path: path});

      var res = mockRes(200, JSON.stringify(result), done);

      MapController.calculate(req, res);
    });

    it ('should validate presence of attributes', function (done) {
      var req = { query: {} };
      MapController.calculate(req, mockRes(422, 'from, to, autonomy, liter_price', done));
    });
  });
});
