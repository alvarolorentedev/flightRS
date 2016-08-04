var _aggregator;

$(function() {
    $("#flight-search").submit(function(){
        $('#collapseOne').collapse('hide');
        alert("search");
        return false;
    });
});

module.exports = function(aggregator){
    _aggregator = aggregator;
}