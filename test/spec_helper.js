var mongoose = require('mongoose')
    chai = require('chai'),
    FactoryGirl = require('factory_girl'),
    sinon = require('sinon');

mongoose.connect('mongodb://localhost/test');

FactoryGirl.definitionFilePaths = [__dirname + '/factories'];
FactoryGirl.findDefinitions();

chai.should();

global.expect = chai.expect;
global.FactoryGirl = FactoryGirl;
global.sinon = sinon;
global.mockRes = function(status, needle, done) {
  return {
    status: function (_status) {
      _status.should.be.equal(status);
      return this;
    },
    send: function (_status, message) {
      _status.should.be.equal(status);
      message.should.contain(needle);
      done();
    },
    json: function (object) {
      JSON.stringify(object).should.contain(needle);
      done();
    }
  };
};
