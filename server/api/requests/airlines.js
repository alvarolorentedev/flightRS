var request = require('request');

function airlines(callback){
     request('http://node.locomote.com/code-task/airlines', function (error, response, body) {
        if (!error && response.statusCode == 200)
            callback(body)
        else
            callback("fail")
    });
}

module.exports = airlines;