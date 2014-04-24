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
