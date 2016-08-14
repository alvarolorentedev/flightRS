var moment = require('moment');

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
                delay:2500,   
                custom: {
                    'is-airport': ($el) => {
                        if(!this._airports.includes($el.val()))
                            return "This airport does not exist, please select and existing airport";   
                     },
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
                            for (var airport of data) {
                                if(!this._airports.includes(airport.airportCode))
                                    this._airports.push(airport.airportCode);
                                //required for typeahead correct bahaviour with objects and html output
                                airport.name = airport.airportCode+','+airport.airportName+','+airport.cityName;
                            }
                            process(data);
                        },"json");
                },
                minLength: 2,
                updater: item => item.airportCode,
                highlighter: (item) => {
                    var airport = item.split(',');
                    return '<div class="typeahead__airport">\
                                <div class="typeahead__airport__main">' + airport[1] +' ('+ airport[0] + ')</div>\
                                <div class="typeahead__airport__sub">' + airport[2] + '</div>\
                            </div>';
                }
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
            $("#search-info").html(this._model.from+' <i class="glyphicon glyphicon-arrow-right"/> '+this._model.to + ' ('+moment(this._model.date).format("YYYY-MM-DD")+')');
            this._aggregator.trigger("frontend:flight:request", this._model);        
        }
        return false;
    }
}