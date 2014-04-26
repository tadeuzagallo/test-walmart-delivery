var MapController = require('../../app/controllers/map'),
    Map = require('../../app/models/map');

describe(MapController, function () {
  before(function (done) {
    Map.remove(function (err) {
      done();
    });
  });

  context('#create', function () {
    it('should create a new map', function (done) {
      var map = FactoryGirl.create('map');
      var req = { params: { map: map } };
      var res = {
        write: function (result) {
          result.should.contain('created');
          done();
        },
        end: function () {}
      }

      MapController.create(req, res);
    });

    it('should output save errors', function (done) {
      var req = { params: {} };
      var res = {
        write: function (output) {
          output.should.contain('`name` is required');
          done();
        },
        end: function () {}
      };

      MapController.create(req, res);
    });
  });

  context('#calculate', function () {
    it('should return route cost and path', function (done) {
      var req = { query: { 
        from: 'A',
        to: 'D',
        autonomy: 10,
        liter_price: 2.5
      }};

      var res = {
        write: function (output) {
          JSON.parse(output).should.be.deep.equal({ cost: 6.25, path: ['A', 'B', 'D'] });
          done();
        },
        end: function () {}
      };

      var routes = [
          {from: 'A', to: 'B', distance: 10},
          {from: 'B', to: 'D', distance: 15},
          {from: 'A', to: 'C', distance: 20},
          {from: 'C', to: 'D', distance: 30},
          {from: 'B', to: 'E', distance: 50},
          {from: 'D', to: 'E', distance: 30}
        ];

      new Map({name: 'foo', routes: routes }).save(function (err) {
        MapController.calculate(req, res);
      });
    });

    it ('should validate presence of attributes', function (done) {
      var req = { query: {} };
      var res = {
        write: function (output) {
          output.should.contain('from, to, autonomy, liter_price');
          done();
        },
        end: function () {}
      };
      MapController.calculate(req, res);
    });
  });
});
