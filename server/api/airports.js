var express = require('express');
var sanitize = require('sanitize-html');

var airports = require('./requests/airports.js');

var router = express.Router();

function ValidateParameters(params){
    if(typeof params.place !== 'string')
        return false;
    return true;
}

function Sanitize(body){
    body.place = sanitize(body.place);
}

router.post('/', function(req, res) {

    if(!ValidateParameters(req.body))
        res.status(400).send('Invalid Parameters');
    
    Sanitize(req.body);

    airports(req.body.place)
        .then((result) => res.send(result))
        .catch(()=> res.status(400).send('Error in execution'));
});

module.exports = router;