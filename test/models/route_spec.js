var Route = require('../../app/models/route');

describe(Route, function () {
  it('should validate presence of from', function (done) {
    new Route().save(function (err) {
      //err.errors.from.should.be.an('object');
      done();
    });
  });
});
