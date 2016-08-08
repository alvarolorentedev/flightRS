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
        this._updateTable($('#date2D_table_body'),results.day2D);
        this._updateTable($('#date1D_table_body'),results.day1D);
        this._updateTable($('#date0_table_body'),results.day0);
        this._updateTable($('#date1U_table_body'),results.day1U);
        this._updateTable($('#date2U_table_body'),results.day2U);
    }

    _updateTable(table, results)
    {
        for(var result of results)
        {
            var tr = $('<tr/>').appendTo(table);
            tr.append('<td>' + result.airline + '</td>');
            tr.append('<td>' + moment(result.departs).format("YYYY-MM-DD") + ' - ' + moment(result.arrives).format("YYYY-MM-DD") + '</td>');
            tr.append('<td>' + result.price + '</td>');
        }
    }
}