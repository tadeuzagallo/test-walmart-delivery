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
    var factory = FactoryGirl.create('map');
    
    new Map(factory).save(function (err) {
      expect(err).to.be.null;

      new Map(factory).save(function (err) {
        err.should.be.an.Object;
        done();
      });
    });
  });

  it('should calculate the shortest path', function (done) {
     var routes = [
        {from: 'A', to: 'B', distance: 10},
        {from: 'B', to: 'D', distance: 15},
        {from: 'A', to: 'C', distance: 20},
        {from: 'C', to: 'D', distance: 30},
        {from: 'B', to: 'E', distance: 50},
        {from: 'D', to: 'E', distance: 30}
      ];

    new Map({name: 'foo', routes: routes }).shortestPath('A', 'D').should.be.deep.equal({ distance: 25, path: ['A', 'B', 'D'] });
    done();
  });
});
