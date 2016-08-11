var express = require('express');
var bodyParser = require('body-parser');

function bodyParsing(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));  
}

module.exports = bodyParsing;