var Aggregator = require('./event-aggregator.js');
var RequestModel= require('./models/request.js');
var RequestPresenter = require('./presenters/request-presenter.js');
var AvailabilityModel= require('./models/availabiliy.js');
var AvailabilityPresenter = require('./presenters/availability-presenter.js');
var APIHandler = require('./api-handler.js');

var aggregatorHandler  = new Aggregator(); 
var apihandler = new APIHandler(aggregatorHandler);

var request = new RequestModel();
var requestsview = new RequestPresenter($(document.search), aggregatorHandler, request);

var availability = new AvailabilityModel();
var availabilityview = new AvailabilityPresenter($(document.availability), aggregatorHandler, availability);
