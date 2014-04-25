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

  Graph.prototype.distance = function (from, to) {
    var closed = [];
    var open = [from];
    var finished = false;
    var data = {};

    data[from] = {g: 0, f: 0, opened: true};

    while (open.length) {
      var that = this;
      var best = open.reduce(function (a, b) {
        if (data[a] && data[a].f < data[b].f) {
          return a;
        }
        
        return b;
      }, -1);

      open.splice(open.indexOf(best), 1);
      data[best].closed = true;

      if (best === to) {
        return data[best].g;
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
            open.push(neighbor);
          }
        }
      });
    }

    return -1;
  };

  return Graph;
})();

module.exports = Graph;
