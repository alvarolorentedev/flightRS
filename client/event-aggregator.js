//extract from https://gist.github.com/ryanjadhav/7366955#file-event_aggregator-js
module.export = class EventAggregator {
    constructor(){
            this.events = {};
    }

    trigger(msg) {
        var args = Array.prototype.splice.call(arguments, 1);
        for(var i = 0, len = this.events[msg].length; i < len; i++) {
            this.events[msg][i].apply(this, args);
        }
    }
 
    on(msg, func) {
        if (!this.events[msg]) {
            this.events[msg] = [];
        }
        this.events[msg].push(func);
    }
 
    off(msg, func) {
        for(var i = 0, len = this.events[msg].length; i < len; i++) {
            if (this.events[msg][i] === func) {
                this.events[msg].splice(i, 1);
            }
        }
    }
}
