var _aggregator;

$(function() {
    $("#flight-search").submit(function(){
        $('#collapseOne').collapse('hide');
        _aggregator.trigger("api:search:flights", $('#FromLocation').val(), $('#ToLocation').val(), $('#Date').val());
        return false;
    });
});

module.exports = function(aggregator){
    _aggregator = aggregator;
}