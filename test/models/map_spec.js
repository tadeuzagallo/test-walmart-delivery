var Graph = function () {},
    requireSubvert = require('require-subvert')(__dirname),
    mongoose = require('mongoose'),
    Map;


describe('Map', function () {
  before(function (done) {
    // Clear mongoose model cache to mock Graph
    mongoose.models = {};
    mongoose.modelSchemas = {};

    // Replace Graph with the empty function to stub
    requireSubvert.subvert('../../app/lib/graph', Graph);
    Map = requireSubvert.require('../../app/models/map');

    Map.remove(function (err) {
      done();
    });
  });

  after(function () {
    requireSubvert.cleanUp();
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

  it('should use graph to calculate the shortest path', function () {
    var factory = FactoryGirl.create('map');
    var path = {distance: 25, path: ['A', 'B', 'D']};

    Graph.prototype.addEdge = sinon.stub();
    Graph.prototype.shortestPath = sinon.stub().withArgs('A', 'D').returns(path);

    new Map(factory).shortestPath('A', 'D').should.be.deep.equal(path);
    Graph.prototype.addEdge.callCount.should.be.equal(factory.routes.length);
  });
});
