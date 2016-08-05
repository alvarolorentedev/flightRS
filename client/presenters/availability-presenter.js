module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();
    }
    
    _bindEvents(){
        this._aggregator.on("api:search:results", (results) => {
            $('#availability').show();
            $(".availability-table-body").empty();
            this.updateResults(results);
        });
    }

    updateResults(results)
    {

    }
}