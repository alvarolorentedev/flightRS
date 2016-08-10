module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._airports = [];
        this._bindEvents();  
        this._initValidation();  
        this._initControls();
    }
   
    _bindEvents(){
        this._document.ready(() => {
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

    _initValidation()
    {
        this._document.ready(() => {
             $("#flight-search").validator({      
                custom: {
                    'is-not-from': ($el) => { 
                        if($el.val() === this._model.from)
                            return "Arrival and Departure airports can't be the same";   
                     },
                     'is-not-to': ($el) => { 
                          if($el.val() === this._model.to)
                            return "Arrival and Departure airports can't be the same";
                    }
                } 
                
            }).on('submit', this.OnSubmit.bind(this));
        });
    }
    
    _initControls()
    {
        this._document.ready(() => {
            $('.typeahead').typeahead({
                source: (query, process) =>{
                        $.post('/airports', { place : query }, (data) => {
                            this._airports = data;
                            process(data);
                        },"json");
                },
                 displayText:  (item) => { return item.airportName; }, 
                 updater: (item) => { return item.airportCode; }
            });
            
            $('#datepicker').datepicker({ 
                startDate: new Date(),
                format: 'yyyy-mm-dd'
            });            
        });
    }

    OnSubmit(e){
        if (!e.isDefaultPrevented()) {
            $('#collapseSearch').collapse('hide');
            this._aggregator.trigger("api:search:request", this._model);        
        }
        return false;
    }
}