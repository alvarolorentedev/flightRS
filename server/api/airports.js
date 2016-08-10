var express = require('express');
var router = express.Router();
var request = require('request');


router.post('/', function(req, res) {
    request('http://node.locomote.com/code-task/airports?q='+req.body.place, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });
});

module.exports = router;