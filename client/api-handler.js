module.exports = class apiHandler{
    constructor(aggregator){
        aggregator.on("api:search:request", () => {
            //TODO: implement call to back end
            var result = {
                day2L : 
                [
                    {airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day1L : 
                [
                    {airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day0 : 
                [
                    {airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day1U : 
                [
                    {airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ],
                day2U : 
                [
                    {airline: "Air France", Departs: new Date(), Arrives: new Date(), Price: "200 $"},
                    {airline: "KLM", Departs: new Date(), Arrives: new Date(), Price: "170 $"},
                    {airline: "BA", Departs: new Date(), Arrives: new Date(), Price: "270 $"}
                ]
            };
            this._aggregator.trigger("api:search:results", result);
        });
    }
}