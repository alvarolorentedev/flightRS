module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();
    }
    
    _bindEvents(){
        var self = this;
        this._aggregator.on("api:search:results", () => {
            $('#availability').show();
            $("#availability-table-body").empty();
        });
    }
}