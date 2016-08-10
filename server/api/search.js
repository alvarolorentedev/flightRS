var express = require('express');
var airlines = require('./requests/airlines.js');
var router = express.Router();

router.post('/airlines', function(req, res) {
    res.send('not implemente');
});

module.exports = router;