var express = require('express');
var airlines = require('./requests/airlines.js');
var search = require('./requests/search.js');
var router = express.Router();

router.post('/', function(req, res) {
    var searchPromise = new Promise((resolve, reject)=>{
        airlines().then((airlinesResult) => {
            var results = [];
            var promises = [];

            for (var airline of JSON.parse(airlinesResult)) {
                promises.push(search(req.body, airline.code));
            }

            var all = Promise.all(promises).then(result => {
                for (var res of result)
                    results = results.concat(JSON.parse(res)); 
            });

            all.then(() => resolve(results)).catch(error => reject('error'));
        });
    });

    searchPromise.then((result) => {res.send(result);}).catch((error) => {res.send(error);});
});

module.exports = router;