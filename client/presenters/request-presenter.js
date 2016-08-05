module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();
    }
    
    _bindEvents(){
        this._document.ready(() => {
            $("#flight-search").submit(() => {
                $('#collapseOne').collapse('hide');
                this._aggregator.trigger("api:search:request", this._model);
                return false;
            });

             $("#FromLocation").change(() => {
                this._model.from = $('#FromLocation').val();
             });

             $("#ToLocation").change(() => {
                this._model.to = $('#ToLocation').val();
             });

             $("#Date").change(() => {
                this._model.date = $('#Date').val();
             });
        });
    }
}