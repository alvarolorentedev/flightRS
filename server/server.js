var express = require('express');

var airlines = require('./api/airlines.js');
var airports = require('./api/airports.js');
var search = require('./api/search.js');
var main = require('./web/main.js');

var app = express();

var isDevMode = process.argv.includes('--dev');

if(isDevMode)
    require('./webpack-load')(app);

require('./Infrastructure/security.js')(app);
require('./Infrastructure/public-paths.js')(app);
require('./Infrastructure/body-parsing.js')(app);

app.use('/airlines', airlines);
app.use('/airports', airports);
app.use('/search', search);

app.use('/', main);

app.listen(3000);