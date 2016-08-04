var aggregator = require('./event-aggregator.js');
var aggregatorInstance  = new aggregator(); 
var listeners = require('./listeners.js')(aggregatorInstance);

aggregatorInstance.on('api:search:flights', function(from,to,when) {
    console.log(from  + " " + to + " " + when);
});