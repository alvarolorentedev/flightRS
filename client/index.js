var Aggregator = require('./event-aggregator.js');
var RequestModel= require('./models/request.js');
var RequestPresenter = require('./presenters/request-presenter.js');
var AvailabilityModel= require('./models/availabiliy.js');
var AvailabilityPresenter = require('./presenters/availability-presenter.js');

var aggregatorInstance  = new Aggregator(); 

var requestmodel = new RequestModel();
var requestsview = new RequestPresenter($(document.search), aggregatorInstance, requestmodel);

var availabilitymodel = new AvailabilityModel();
var availabilityview = new AvailabilityPresenter($(document.availability), aggregatorInstance, availabilitymodel);

aggregatorInstance.on('api:search:request', function(model) {
    console.log(model.from  + " " + model.to + " " + model.date);
});