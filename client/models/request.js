var moment = require('moment');

module.exports = class request{
    constructor(){
        this.from = "";
        this.to = "";
        this.date = null;
    }

    clone()
    {
        var local = new request();
        local.from = this.from;
        local.to = this.to;
        local.date = new Date(this.date);
        return local;
    }

    get Json(){
        return { from: this.from, to: this.to, date: moment(this.date).format("YYYY-MM-DD") }
    }
}