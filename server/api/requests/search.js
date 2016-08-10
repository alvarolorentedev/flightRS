var request = require('request');

function search(query, airline){
    return new Promise((resolve, reject)=>{
        request('http://node.locomote.com/code-task/flight_search/'+airline+'?date='+query.date+"&from="+query.from+"&to="+query.to, function (error, response, body) {
            if (!error && response.statusCode == 200)
                resolve(body);
            else
                reject("Data request failed");
        });
    });
}

module.exports = search;