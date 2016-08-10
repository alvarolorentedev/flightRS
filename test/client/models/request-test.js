var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var request = require('../../../client/models/request.js');

var before = function(){
    date = new Date(2011, 0, 1, 2, 3, 4, 567);
    from = "LHR";
    to = "ORY";
};

var testEmptyRequest = function(){
    var localRequest = new request();
    expect(localRequest.from).to.equal("");
    expect(localRequest.to).to.equal("");
    expect(localRequest.date).to.equal(null);
};

describe('Request Tests', function(){
    before(before);
    it ('test initial values', testEmptyRequest);
});