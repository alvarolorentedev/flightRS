var _aggregator;

module.export = function(aggregator){
    _aggregator = aggregator;
}

$(function() {
    $("#flight-search").submit(function(){
        $('#collapseOne').collapse('hide');
        alert("search");
        return false;
    });
});
