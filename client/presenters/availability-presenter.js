var moment = require('moment');

module.exports = class requestPresenter{
    constructor(document, aggregator){
        this._document = document;
        this._aggregator = aggregator;
        this._data = {
            '2D': {'header': '#date2D', body: '#date2D_table_body', result: null},
            '1D': {'header': '#date1D', body: '#date1D_table_body', result: null},
            'day': {'header': '#date0', body: '#date0_table_body', result: null},
            '1U': {'header': '#date1U', body: '#date1U_table_body', result: null},
            '2U': {'header': '#date2U', body: '#date2U_table_body', result: null},
         };
        this._bindEvents();
    }
    
    _bindEvents(){
        this._aggregator.on("frontend:flight:request", (request) => {
            $('#availability').hide();
            $('#loading').show();
            this._aggregator.trigger("api:search:request", request, "day");
            
            $('.availability-table-body').empty();
            $('.date__header').html('-');
            
            var extraRange = 2;
            for( var extra = 1; extra <= extraRange; ++extra){
                var requestUp = request.clone();
                var requestDown = request.clone();
                requestUp.date.setDate(requestUp.date.getDate() + extra);
                requestDown.date.setDate(requestDown.date.getDate() - extra);
                this._aggregator.trigger("api:search:request", requestUp, extra+'U');
                this._aggregator.trigger("api:search:request", requestDown, extra+'D');
            }
            
        });

        this._aggregator.on("api:search:results", (results, day) => {
            this._data[day].result = results;
            this._data[day].result.sort((first, second) => first.price - second.price);
            this._updateResults(this._data[day]);
            $('#loading').hide();
            $('#availability').show();
        });
    }

    _updateResults(day)
    {
        this._updateTable(day);
        this._bindFlightEvents(day.body);
    }

    _updateTable(day)
    {
        var min = Math.min(...day.result.map(flight => flight.price));
        var date = moment(day.result[0].start.dateTime).format("YYYY-MM-DD");
        $(day.header).html(date + " ("+ min +")");
        for(var result of day.result)
        {
            var tr = $('<tr/>').appendTo($(day.body));
            var div = $('<div class="flight well" />').appendTo(tr);
            div.append('<div class="flight__airline">' + result.airline.code + '</div>');
            div.append('<div class="flight__price">' + result.price + '</div>');
            div.append('<div class="flight__date">' + moment(result.start.dateTime).format("YYYY-MM-DD  h:mm a") + ' - ' + moment(result.finish.dateTime).format("YYYY-MM-DD h:mm a") + '</div>');
        }
    }

    _bindFlightEvents(body){
        this._document.ready(() =>{
            $('.flight').click(function() {
                $('.flight').removeClass('flight--selected');
                $(this).addClass('flight--selected');
            });
        });
    }
}