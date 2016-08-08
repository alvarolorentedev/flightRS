module.exports = class requestPresenter{
    constructor(document, aggregator, model){
        this._document = document;
        this._aggregator = aggregator;
        this._model = model;
        this._bindEvents();
    }
    
    _bindEvents(){
        this._aggregator.on("api:search:results", (results) => {
            $('#availability').show();
            $(".availability-table-body").empty();
            this._updateResults(results);
        });
    }

    _updateResults(results)
    {
        this._updateTable($('#date2D'), $('#date2D_table_body'),results.day2D);
        this._updateTable($('#date1D'), $('#date1D_table_body'),results.day1D);
        this._updateTable($('#date0'), $('#date0_table_body'),results.day0);
        this._updateTable($('#date1U'), $('#date1U_table_body'),results.day1U);
        this._updateTable($('#date2U'), $('#date2U_table_body'),results.day2U);
    }

    _updateTable(header, table, results)
    {
        header.html(moment(results[0].departs).format("YYYY-MM-DD"));
        for(var result of results)
        {
            var tr = $('<tr/>').appendTo(table);
            var div = $('<div/>').appendTo(tr);
            div.append('<div class="table__airline">' + result.airline + '</div>');
            div.append('<div class="table__price">' + result.price + '</div>');
            div.append('<div class="table__date">' + moment(result.departs).format("YYYY-MM-DD  h:mm a") + ' - ' + moment(result.arrives).format("YYYY-MM-DD h:mm a") + '</div>');
        }
    }
}