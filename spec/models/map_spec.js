var Map = require('../../app/models/map'),
    mongoose = require('mongoose'),
    chai = require('chai'),
    expect = chai.expect;

mongoose.connect('mongodb://localhost/test');

describe(Map, function () {
  it('should validate presence of name', function (done) {
    var map = new Map();

    map.save(function (err) {
      expect(err.errors.name).to.be.an.object;
      done();
    });
  });
});
