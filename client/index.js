var aggregator = require('./event-aggregator.js');
var requestModel= require('./models/request.js');
var requestPresenter = require('./presenters/requestPresenter.js');

var aggregatorInstance  = new aggregator(); 

var requestModel = new requestModel();
var requestsview = new requestPresenter($(document.search), aggregatorInstance, requestModel);

aggregatorInstance.on('api:search:flights', function(model) {
    console.log(model.from  + " " + model.to + " " + model.date);
});