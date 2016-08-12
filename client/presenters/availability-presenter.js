var moment = require('moment');

module.exports = class availabilityPresenter{
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
            $('.date__header').hide();
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
        var date = moment(day.result[0].finish.dateTime).format("YYYY-MM-DD");
        $(day.header).show();
        $(day.header).html('<div class="date__header__date">' + date + '</div><div class="date__header__price"> '+ min +" $</div>");
        for(var result of day.result)
        {
            this._renderIndividualResult(result, day);
        }
    }

    _renderIndividualResult(result, day)
    {
        var localId = result.flightNum + moment(result.start.dateTime).format("YYYYMMDDhmmss")
        var extraDays = moment(result.finish.dateTime,['YYYY-MM-DD']).diff(moment(result.start.dateTime,['YYYY-MM-DD']), 'days');
        var extraDaysString = '+' + extraDays;  
        var tr = $('<tr/>').appendTo($(day.body));
        var main = $('<div class="flight well" />').appendTo(tr);
        main.append('<div class="flight__info col-md-10">\
                        <div class= "flight__info__airline col-md-2">' + result.airline.name + '</div>\
                        <div class= "flight__info__date col-md-10">\
                            <div class= "flight__info__date__departs col-md-4">'+ moment(result.start.dateTime).format("h:mm a") + '</div>\
                            <div class= "flight__info__date__trip col-md-4">\
                                <div class="flight__info__date__trip__arrow">\<i class="glyphicon glyphicon-arrow-right"></i></div>\
                                <div  class="flight__info__date__trip__days">'+ extraDaysString + '</div>\
                            </div>\
                            <div class= "flight__info__date__arrives col-md-4">'+ moment(result.finish.dateTime).format("h:mm a") + '</div>\
                    </div>');
        main.append('<div class="flight__selection col-md-2">\
                        <div class= "flight__selection_price">' + result.price + ' $</div>\
                        <button type="button" class= "btn btn-success btn-sm flight__flight__select" id="flight-select-'+localId+'">select</button>\
                    </div></div>');
                    this._bindSelectButton(localId,result);
    }

    _bindFlightEvents(body){
        this._document.ready(() =>{
            $('.flight').click(function() {
                $('.flight').removeClass('flight--selected');
                $(this).addClass('flight--selected');
            });
        });
    }

    _bindSelectButton(id, flight){
        this._document.ready(() =>{
            $('#flight-select-'+id).click(() => alert("selected " + JSON.stringify(flight)));
        });
    }
}