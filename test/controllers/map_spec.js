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
});
