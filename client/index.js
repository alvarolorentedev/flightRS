var aggregator = require('./event-aggregator.js');
var aggregatorInstance  = new aggregator(); 
var listeners = require('./listeners.js')(aggregatorInstance);

