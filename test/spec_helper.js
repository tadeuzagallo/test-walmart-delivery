var mongoose = require('mongoose'),
    chai = require('chai');

mongoose.connect('mongodb://localhost/test');

chai.should();
global.expect = chai.expect;
