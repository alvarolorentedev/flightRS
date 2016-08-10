var request = require('request');

function airports(query, callback){
    request('http://node.locomote.com/code-task/airports?q='+query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
}

module.exports = airports;