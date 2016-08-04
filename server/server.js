var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var isDevMode = process.argv.includes('--dev');

if(isDevMode)
    require('./webpack-load')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.listen(3000);