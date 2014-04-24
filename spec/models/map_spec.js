var Map = require('../../app/models/map'),
    mongoose = require('mongoose'),
    chai = require('chai'),
    expect = chai.expect;

mongoose.connect('mongodb://localhost/test');

describe(Map, function () {
  before(function (done) {
    Map.remove(function (err) {
      done();
    });
  });

  it('should validate presence of name', function (done) {
    var map = new Map();

    map.save(function (err) {
      expect(err.errors.name).to.be.an.object;
      done();
    });
  });

  it('should validate uniqueness of name', function (done) {
    var name = 'map_1';
    
    new Map({ name: name }).save(function (err) {
      expect(err).to.be.null;

      new Map({ name: name }).save(function (err) {
        expect(err).to.be.an.object;
        done();
      });
    });
  });
});
