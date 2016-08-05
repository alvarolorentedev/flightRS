module.exports = class apiHandler{
    constructor(aggregator){
        this._aggregator = aggregator;
        aggregator.on("api:search:request", () => {
            //TODO: implement call to back end
            var result = {
                day2D : 
                [
                    {Airline: "AF", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {Airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {Airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day1D : 
                [
                    {Airline: "AF", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {Airline: "Iberia", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {Airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day0 : 
                [
                    {Airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {Airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {Airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day1U : 
                [
                    {Airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {Airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {Airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day2U : 
                [
                    {Airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {Airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {Airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ]
            };
            this._aggregator.trigger("api:search:results", result);
        });
    }
}