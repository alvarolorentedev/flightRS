var express = require('express');
var airlines = require('./requests/airlines.js');
var router = express.Router();

router.post('/', function(req, res) {
    airlines((response) =>{ res.send(response); }).then((result) => {
        res.send(result);
    });
});

module.exports = router;