var IndexController = require('../../app/controllers/index');

describe(IndexController, function () {
  context('#indexAction', function () {
    it('should be a function', function () {
      IndexController.indexAction.should.be.a.Function;
    });

    it('should output hello world', function () {
      var mockRes = {
        write: function(str) {
          str.should.be.equal('Hello, World!');
        },
        end: function(){}
      }

      IndexController.indexAction(null, mockRes);
    });
  });
});
