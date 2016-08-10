var express = require('express');
var airports = require('./requests/airports.js');
var router = express.Router();

router.post('/', function(req, res) {
    airports(req.body.place, (response) =>{ res.send(response); });
});

module.exports = router;