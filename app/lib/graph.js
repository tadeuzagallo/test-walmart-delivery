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
      var i = -1;
      var best = 1 << 30;

      for (var j = 0; j < open.length; j++) {
        var k = open[j];

        if (data[k].f < best) {
          best = data[k].f;
          i = k;
        }
      }

      best = open.splice(i, 1)[0];
      data[best].closed = true;

      if (best === to) {
        return data[best].g;
      }

      var neighbors = Object.keys(this.vertex[best]);
      for (i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        data[neighbor] = data[neighbor] || {};

        if (data[neighbor].closed) continue;

        var ng = data[best].g + this.vertex[best][neighbor];

        if (!data[neighbor].opened || data[neighbor].g > ng) {
          data[neighbor].g = ng;
          data[neighbor].h = data[neighbor].h || this.vertex[best][neighbor] * (to.charCodeAt(0) - neighbor.charCodeAt(0));
          data[neighbor].f = ng + data[neighbor].h;
          data[neighbor].parent = best;

          if (!data[neighbor].opened) {
            data[neighbor].opened = true;
            open.push(neighbor);
          }
        }
      }
    }

    return -1;
  };

  return Graph;
})();

module.exports = Graph;
