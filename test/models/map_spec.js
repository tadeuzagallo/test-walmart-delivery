var Map = require('../../app/models/map');

describe(Map, function () {
  before(function (done) {
    Map.remove(function (err) {
      done();
    });
  });

  it('should have a valid factory', function (done) {
    var factory = FactoryGirl.create('map');
    new Map(factory).save(function (err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should validate presence of name', function (done) {
    new Map().save(function (err) {
      err.errors.name.should.be.an.Object;
      done();
    });
  });

  it('should validate uniqueness of name', function (done) {
    var name = 'map_1';
    
    new Map({ name: name }).save(function (err) {
      expect(err).to.be.null;

      new Map({ name: name }).save(function (err) {
        err.should.be.an.Object;
        done();
      });
    });
  });
});
