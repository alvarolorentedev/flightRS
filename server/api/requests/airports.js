var request = require('request');

function airports(query, callback){
    return new Promise((resolve, reject)=>{
        request('http://node.locomote.com/code-task/airports?q='+query, function (error, response, body) {
            if (!error && response.statusCode == 200)
                resolve(body);
            else
                reject("Data request failed");
        });
    });
}

module.exports = airports;