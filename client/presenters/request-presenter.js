module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();    
        this._initControls();
    }
   
    _bindEvents(){
        this._document.ready(() => {
            $("#flight-search").validator().on('submit', (e) => {
                if (!e.isDefaultPrevented()) {
                    $('#collapseOne').collapse('hide');
                    this._aggregator.trigger("api:search:request", this._model);
                    
                }
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

    _initControls()
    {
        this._document.ready(() => {
             $("#flight-search").validator({  
                delay: 1000,              
                custom: {
                    // 'is-airport': ($el) => { 
                    //       if(!this._airports.some((airport) => { return $el.val() == airport.id;}))
                    //         return "This Airport is not available"; 
                    //       },
                     'is-not-from': ($el) => { 
                          if($el.val() == $('#FromLocation').val())
                            return "Arrival and Departure airports can't be the same";   
                        },
                     'is-not-to': ($el) => { 
                          if($el.val() == $('#ToLocation').val())
                            return "Arrival and Departure airports can't be the same";
                    },
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
                source: function(query, sync, async) {
                    $.post('/airports', { place : query }, (data) => {
                            async(data);
                        },"json");
                },
                templates: {
                    suggestion: function(airport) {
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