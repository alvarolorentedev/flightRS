var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var app = express();

var airlines = require('./api/airlines.js');
var airports = require('./api/airports.js');
var search = require('./api/search.js');


var isDevMode = process.argv.includes('--dev');

if(isDevMode)
    require('./webpack-load')(app);

app.use('/partials', express.static('client/views/partials'));
app.use('/scripts', express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/airlines', airlines);
app.use('/airports', airports);
app.use('/search', search);

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
});

app.listen(3000);