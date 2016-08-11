module.exports = class request{
    constructor(){
        this.from = "";
        this.to = "";
        this.date = null;
    }

    get Json(){
        return { from: this.from, to: this.to, date: moment(this.date).format("YYYY-MM-DD") }
    }
}