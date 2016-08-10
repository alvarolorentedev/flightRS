var express = require('express');
var airlines = require('./requests/airlines.js');
var router = express.Router();

router.post('/', function(req, res) {
    airlines((response) =>{ res.send(response); });
});

module.exports = router;