module.exports = class apiHandler{
    constructor(aggregator){
        this._aggregator = aggregator;
        aggregator.on("api:search:request", (request, idExtra) => {
            $.post('/search', request.Json, (data) => {
                this._aggregator.trigger("api:search:results", data, idExtra);
            },"json");
        });
    }
}