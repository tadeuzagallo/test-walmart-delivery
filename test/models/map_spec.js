var Map = require('../../app/models/map'),
    chai = require('chai'),
    expect = chai.expect;

describe(Map, function () {
  before(function (done) {
    Map.remove(function (err) {
      done();
    });
  });

  it('should validate presence of name', function (done) {
    new Map().save(function (err) {
      expect(err.errors.name).to.be.an('object');
      done();
    });
  });

  it('should validate uniqueness of name', function (done) {
    var name = 'map_1';
    
    new Map({ name: name }).save(function (err) {
      expect(err).to.be.null;

      new Map({ name: name }).save(function (err) {
        expect(err).to.be.an('object');
        done();
      });
    });
  });
});
