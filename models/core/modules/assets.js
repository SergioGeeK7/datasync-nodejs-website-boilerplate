var Utils = require('../lib/utils')
// var Stack = require('../stack')
var Query = require('./query')


/**
 * @summary Creates an instance of 'Assets'.
 * @description An initializer is responsible for creating Asset object.
 * @param {String} uid - uid of the asset
 * @example
 * let Assets = Contentstack.Stack().Assets('bltsomething123');
 * @returns {Assets}
 * @ignore
 */
class Assets {
    constructor() {
        this._query = {};        
        this.only = Utils.transform('only');
        return this;
    }

    toJSON() {
        this.tojson = true;
        return this;
    }

    addParam(key, value) {
        if (key && typeof key === 'string' && value && typeof value === 'string') {        
            this._query[key] = value;
            return this;
        } else {
            console.error("Kindly provide a valid parameters.");
        }
    }

    fetch() {
        if (this.asset_uid) {
            // this.requestParams = {
            //     method: 'POST',
            //     headers: this.headers,
            //     url: this.config.protocol + "://" + this.config.host + ':' + this.config.port + '/' + this.config.version + this.config.urls.assets + this.asset_uid,
            //     body: {
            //         _method: 'GET',
            //         query: this._query
            //     }
            // }
            return this.db.collection("assets")
            .findOne({uid : this.asset_uid})
            // return Utils.sendRequest(this);
        } else {
            console.error("Kindly provide an asset uid. e.g. .Assets('bltsomething123')");
        }
    }
}

module.exports = new Assets();