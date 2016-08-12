var request = require('request');

function airlines(){
     return new Promise((resolve, reject)=>{
        request('http://node.locomote.com/code-task/airlines', function (error, response, body) {
            if (!error && response.statusCode == 200)
                resolve(body);
            else
                reject("fail");
        });
    });
}

module.exports = airlines;