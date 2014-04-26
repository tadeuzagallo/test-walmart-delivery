var PriorityQueue = require('priorityqueuejs');

var Graph = (function () {
  function Graph() {
    this.vertex = {};
  }

  Graph.prototype.addEdge = function (from, to, distance) {
    this.connect(from, to, distance);
    this.connect(to, from, distance);
  }

  Graph.prototype.connect = function (from, to, distance) {
    this.vertex[from] = this.vertex[from] || {};
    this.vertex[from][to] = distance;
  }

  Graph.prototype.shortestPath = function (from, to) {
    var closed = [];
    var finished = false;
    var data = {};

    var open = new PriorityQueue(function (a, b) {
      return  data[b].f - data[a].f;
    });

    data[from] = {g: 0, f: 0, opened: true};
    open.enq(from);

    while (!open.isEmpty()) {
      var that = this;
      var best = open.deq();

      if (best === to) {
        var route = [best];
        var distance = data[best].g

        while (data[best].parent) {
          best = data[best].parent;
          route.unshift(best);
        }

        return { distance: distance, route: route };
      }

      Object.keys(this.vertex[best]).forEach(function (neighbor) {
        data[neighbor] = data[neighbor] || {};

        if (data[neighbor].closed) return;

        var ng = data[best].g + that.vertex[best][neighbor];

        if (!data[neighbor].opened || data[neighbor].g > ng) {
          data[neighbor].g = ng;
          data[neighbor].h = data[neighbor].h || that.vertex[best][neighbor] * (to.charCodeAt(0) - neighbor.charCodeAt(0));
          data[neighbor].f = ng + data[neighbor].h;
          data[neighbor].parent = best;

          if (!data[neighbor].opened) {
            data[neighbor].opened = true;
            open.enq(neighbor);
          }
        }
      });
    }

    return { distance: -1, route: null };
  };

  return Graph;
})();

module.exports = Graph;
