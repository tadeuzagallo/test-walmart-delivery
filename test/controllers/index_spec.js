var chai = require('chai'),
    IndexController = require('../../app/controllers/index')
    expect = chai.expect;

describe(IndexController, function () {
  context('#indexAction', function () {
    it('should be a function', function () {
      expect(IndexController.indexAction).to.be.a.function;
    });

    it('should output hello world', function () {
      var mockRes = {
        write: function(str) {
          expect(str).to.be.equal('Hello, World!');
        },
        end: function(){}
      }

      IndexController.indexAction(null, mockRes);
    });
  });
});
