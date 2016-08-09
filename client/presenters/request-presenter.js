module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._airports = [];
        this._bindEvents();    
        this._initControls();
    }
   
    _bindEvents(){
        this._document.ready(() => {
            $("#flight-search").validator().on('submit', (e) => {
                if (!e.isDefaultPrevented()) {
                    this._model.from = $('#FromLocation').val();
                    this._model.to = $('#ToLocation').val();
                    this._model.date = $('#Date').val();
                    $('#collapseSearch').collapse('hide');
                    this._aggregator.trigger("api:search:request", this._model);
                    
                }
                return false;
            });   
        });        
    }

    _initControls()
    {
        this._document.ready(() => {
             $("#flight-search").validator({  
                delay: 1000,              
                custom: {
                    'is-valid-date': ($el) => { 
                          if(moment($el.val(), "YYYY-MM-DD").diff(new Date(), 'days') < 0)
                            return "Date has to on the future";
                    }
                } 
                
            });

            $('.typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 2
            }, {
                display: 'airportCode',
                source: (query, sync, async) => {
                    $.post('/airports', { place : query }, (data) => {
                            this._airports = data;
                            async(data);
                        },"json");
                },
                templates: {
                    suggestion: (airport) => {
                        return '<div>' + airport.airportName + '('+ airport.airportCode +')' + '</div>';
                    },
                    pending: '<div>Please wait...</div>'
                }
            });
            
            $('#datepicker').datepicker({ 
                startDate: new Date(),
                format: 'yyyy-mm-dd'
            });            
        });
    }
}