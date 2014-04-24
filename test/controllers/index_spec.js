var IndexController = require('../../app/controllers/index');

describe(IndexController, function () {
  context('#index', function () {
    it('should be a function', function () {
      IndexController.index.should.be.a.Function;
    });

    it('should output hello world', function () {
      var mockRes = {
        write: function(str) {
          str.should.be.equal('Hello, World!');
        },
        end: function(){}
      }

      IndexController.index(null, mockRes);
    });
  });
});
