module.exports = class apiHandler{
    constructor(aggregator){
        this._aggregator.on("api:search:request", () => {
            //TODO: implement call to back end
            var result = {};
            self._aggregator.trigger("api:search:results", result);
        });
    }
}