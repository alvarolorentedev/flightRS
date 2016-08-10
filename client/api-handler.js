var mockFlights = {
                day2D : 
                [
                    {airline: "AF", departs: new Date(), arrives: new Date(), price: "200 $"},
                    {airline: "KLM", departs: new Date(), arrives: new Date(), price: "170 $"},
                    {airline: "BA", departs: new Date(), arrives: new Date(), price: "270 $"}
                ],
                day1D : 
                [
                    {airline: "AF", departs: new Date(), arrives: new Date(), price: "200 $"},
                    {airline: "Iberia", departs: new Date(), arrives: new Date(), price: "170 $"},
                    {airline: "BA", departs: new Date(), arrives: new Date(), price: "270 $"}
                ],
                day0 : 
                [
                    {airline: "Air France", departs: new Date(), arrives: new Date(), price: "200 $"},
                    {airline: "KLM", departs: new Date(), arrives: new Date(), price: "170 $"},
                    {airline: "BA", departs: new Date(), arrives: new Date(), price: "270 $"}
                ],
                day1U : 
                [
                    {airline: "Air France", departs: new Date(), arrives: new Date(), price: "200 $"},
                    {airline: "KLM", departs: new Date(), arrives: new Date(), price: "170 $"},
                    {airline: "BA", departs: new Date(), arrives: new Date(), price: "270 $"}
                ],
                day2U : 
                [
                    {airline: "Air France", departs: new Date(), arrives: new Date(), price: "200 $"},
                    {airline: "KLM", departs: new Date(), arrives: new Date(), price: "170 $"},
                    {airline: "BA", departs: new Date(), arrives: new Date(), price: "270 $"}
                ]
            };

module.exports = class apiHandler{
    constructor(aggregator){
        this._aggregator = aggregator;
        aggregator.on("api:search:request", (request) => {
            //TODO: implement call to back end
            var result = mockFlights;
            this._aggregator.trigger("api:search:results", result);
        });
    }
}