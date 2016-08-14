window.init = function (){
    var Aggregator = require('./event-aggregator.js');
    var APIHandler = require('./api-handler.js');

    var RequestModel= require('./models/request.js');
    var RequestPresenter = require('./presenters/request-presenter.js');

    var AvailabilityPresenter = require('./presenters/availability-presenter.js');

    var IndexStyle = require('./views/styles/index.styl');
    var RequestStyle = require('./views/styles/request.styl');
    var AvailabilityStyle = require('./views/styles/availability.styl');

    var aggregatorHandler  = new Aggregator(); 
    var apihandler = new APIHandler(aggregatorHandler);

    var request = new RequestModel();
    var requestsview = new RequestPresenter($(document.search), aggregatorHandler, request);

    var availabilityview = new AvailabilityPresenter($(document.availability), aggregatorHandler);
    
    $('#page-loading').hide();
    $('#page-content').show();
}
