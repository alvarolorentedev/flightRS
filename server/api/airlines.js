var express = require('express');
var airlines = require('./requests/airlines.js');
var router = express.Router();

router.post('/', function(req, res) {
    airlines()
        .then((result) => res.send(result))
        .catch(() => res.status(400).send('Error in execution'));
});

module.exports = router;