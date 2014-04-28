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
global.RequireSubvert = require('require-subvert');
global.mockRes = function(status, needle, done) {
  return {
    status: function (_status) {
      _status.should.be.equal(status);
      return this;
    },
    json: function (object) {
      JSON.stringify(object).should.contain(needle);
      done();
    }
  };
};
