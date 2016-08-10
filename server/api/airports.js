var express = require('express');
var airports = require('./requests/airports.js');
var router = express.Router();

router.post('/', function(req, res) {
    airports(req.body.place).then((result) => {
        res.send(result);
    });
});

module.exports = router;