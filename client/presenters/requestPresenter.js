module.exports = class request{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._initEvents();
    }
    
    _initEvents(){
        var self = this;
        this._document.ready(function() {
            $("#flight-search").submit(function(){
                $('#collapseOne').collapse('hide');
                self._aggregator.trigger("api:search:flights", self._model);
                return false;
            });

             $("#FromLocation").change(function(){
                self._model.from = $('#FromLocation').val();
             });

             $("#ToLocation").change(function(){
                self._model.to = $('#ToLocation').val();
             });

             $("#Date").change(function(){
                self._model.date = $('#Date').val();
             });
        });
    }
}