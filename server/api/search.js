var express = require('express');
var sanitize = require('sanitize-html');

var airlines = require('./requests/airlines.js');
var search = require('./requests/search.js');

var router = express.Router();

function ValidateParameters(params){
    if(typeof params.from !== 'string' && typeof params.to !== 'string' && typeof params.date !== 'string')
        return false;
    return true;
}


function Sanitize(body){
    body.from = sanitize(body.from);
    body.to = sanitize(body.to);
    body.date = sanitize(body.date);
}

function SearchAllAirlines(req){
    return new Promise((resolve, reject)=>{
        airlines().then((airlinesResult) => {
            var results = [];
            var promises = [];

            for (var airline of JSON.parse(airlinesResult))
                promises.push(search(req.body, airline.code));

            Promise.all(promises).then(result => {
                for (var res of result)
                    results = results.concat(JSON.parse(res)); 
            })
                .then(() => resolve(results))
                .catch((error) => reject(error));
        });
    });
}

router.post('/', function(req, res) {
    if(!ValidateParameters(req.body))
        res.status(400).send('Invalid Parameters');
    
    Sanitize(req.body);

    SearchAllAirlines(req)
        .then((result) => res.send(result))
        .catch(() => res.status(400).send('Error in execution'));
});

module.exports = router;