var Graph = require('../../app/lib/graph');

describe('Graph', function () {
  it('should contain vertex', function () {
    new Graph().vertex.should.be.an.Object;
  });

  context('#addEdge', function () {
    it('should be a function', function () {
      new Graph().addEdge.should.be.a.Function;
    });

    it ('should call connect twice', function () {
      var graph = new Graph();
      var stub = sinon.stub(graph, 'connect');

      graph.addEdge('A', 'B', 10);

      stub.calledTwice.should.be.ok;
    });
  });

  context('#connect', function () {
    it('should create the edge on graph\'s vertex', function () {
      var graph = new Graph();

      expect(graph.vertex.A).to.be.undefined;

      graph.connect('A', 'B', 10);

      graph.vertex.A.should.be.an.Object;
      graph.vertex.A.B.should.be.equal(10);
    });
  });

  context('#shortestPath', function () {
    it('should be a function', function() {
      new Graph().shortestPath.should.be.a.Function;
    });

    it('should solve a basic problem', function () {
      var graph = new Graph();
      graph.addEdge('A', 'B', 10);
      graph.addEdge('B', 'D', 15);
      graph.addEdge('A', 'C', 20);
      graph.addEdge('C', 'D', 30);
      graph.addEdge('B', 'E', 50);
      graph.addEdge('D', 'E', 30);

      graph.shortestPath('A', 'D').should.be.deep.equal({ distance: 25, path: ['A', 'B', 'D'] });
    });
  });
});
