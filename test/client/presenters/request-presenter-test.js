var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var requestPresenter = require('../../../client/presenters/request-presenter.js');

var before = function(){

};

var testEmptyRequest = function(){
    var localRequest = new requestPresenter();
};

describe('Request Presenter Tests', function(){
    before(before);
    //it ('test initial values', testEmptyRequest);
});