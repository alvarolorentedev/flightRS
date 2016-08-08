module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._initControls();
        this._bindAirports();
        this._bindEvents();    
    }

    _bindAirports()
    {
        this._aggregator.on("api:airports:results", (airports) => { 
            this._airports = airports;
            this._document.ready(() => {
                $('.typeahead').typeahead(
                {
	                source: (request, response) => { return  response( this._airports ); },
	                autoSelect: true,
                    updater:  (item) => { return item.id; },
	                displayText: (item) => { return item.name; }
                });
            });
         });
         this._aggregator.trigger("api:airports:request");
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
                custom: {
                    'is-airport': ($el) => { 
                          if(!this._airports.some((airport) => { return $el.val() == airport.id;}))
                            return "This Airport is not available"; 
                          },
                     'is-not-from': ($el) => { 
                          if($el.val() == $('#FromLocation').val())
                            return "Arrival and Departure airports can't be the same";   
                        },
                     'is-not-to': ($el) => { 
                          if($el.val() == $('#ToLocation').val())
                            return "Arrival and Departure airports can't be the same";
                    },
                    'is-valid-date': ($el) => { 
                          if(moment($el.val(), "MM/DD/YYYY").diff(new Date(), 'days') < 0)
                            return "date has to be for future";
                    }
                } 
            });

            $('#datepicker').datepicker({ 
                startDate: new Date()
            });            
        });
    }
}