var Route = require('../../app/models/route');

describe(Route, function () {
  it('should validate presence of from', function (done) {
    validatePresence('from', done);
  });

  it('should validate presence of to', function (done) {
    validatePresence('to', done);
  });

  it('should validate presence of distance', function (done) {
    validatePresence('distance', done);
  });

  function validatePresence(field, done) {
    new Route().save(function (err) {
      err.errors[field].should.be.an.Object;
      done();
    });
  }
});
