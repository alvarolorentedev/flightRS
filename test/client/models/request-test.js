var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var moment = require('moment');
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

var testJsonProperty = function(){
    var localRequest = new request();
    localRequest.from = "JFK";
    localRequest.to = "ORY";
    localRequest.date = new Date(2017,02,17);

    var expected = { from: localRequest.from, to: localRequest.to, date: moment(localRequest.date).format("YYYY-MM-DD") }

    expect(expected).to.deep.equal(localRequest.Json);
};

var testClone = function(){
    var localRequest = new request();
    localRequest.from = "JFK";
    localRequest.to = "ORY";
    localRequest.date = new Date(2017,02,17);

    var clon = localRequest.clone();

    expect(localRequest).to.deep.equal(clon);
};

describe('Request Tests', function(){
    before(before);
    it ('test initial values', testEmptyRequest);
    it ('test Json property', testJsonProperty);
    it ('test clone method', testClone);
});