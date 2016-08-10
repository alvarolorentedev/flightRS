var express = require('express');
var router = express.Router();

router.get('/airlines', function(req, res) {
    res.send('not implemente');
});

router.get('/flight_search/:airlines_code', function(req, res) {
    res.send('not implemente');
});

module.exports = router;