module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();
    }
    
    _bindEvents(){
        this._aggregator.on("api:search:results", (results) => {
            $(".availability-table-body").empty();
            this._updateResults(results);
            $('#availability').show();
        });
    }

    _updateResults(results)
    {
        this._updateTable($('#date2D'), $('#date2D_table_body'),results.day2D);
        this._updateTable($('#date1D'), $('#date1D_table_body'),results.day1D);
        this._updateTable($('#date0'), $('#date0_table_body'),results.day0);
        this._updateTable($('#date1U'), $('#date1U_table_body'),results.day1U);
        this._updateTable($('#date2U'), $('#date2U_table_body'),results.day2U);
        this._bindFlightEvents();
    }

    _updateTable(header, table, results)
    {
        header.html(moment(results[0].departs).format("YYYY-MM-DD"));
        for(var result of results)
        {
            var tr = $('<tr/>').appendTo(table);
            var div = $('<div class="flight well" />').appendTo(tr);
            div.append('<div class="flight__airline">' + result.airline + '</div>');
            div.append('<div class="flight__price">' + result.price + '</div>');
            div.append('<div class="flight__date">' + moment(result.departs).format("YYYY-MM-DD  h:mm a") + ' - ' + moment(result.arrives).format("YYYY-MM-DD h:mm a") + '</div>');
        }
    }

    _bindFlightEvents(){
        this._document.ready(() =>{
            $('.flight').click(function() {
                $('.flight').removeClass('flight--selected');
                $(this).addClass('flight--selected');
            });
        });
    }
}