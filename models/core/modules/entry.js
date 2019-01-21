var Utils = require('../lib/utils')

/**
 * @summary Creates an instance of `Entry`.
 * @description An initializer is responsible for creating Entry object.
 * @param {String} uid - uid of the entry
 * @example
 * let Entry = Contentstack.Stack().ContentType('example).Entry();
 * @returns {Entry}
 * @ignore
 */

class Entry {

    constructor() {
        this._query = {};
        /**
         * @method only
         * @description Displays values of only the specified fields of entries or assets in the response
         * @param {String} [key=BASE] -  Assets: </br>
         *                                <p>Retrieves specified field of asset</p>
         * @param {String}            -  Entries:</br>
         *                                       <p>- retrieves default fields of the schema.</p>
         *                                       <p>- referenced_content-type-uid : retrieves fields of the referred content type.</p>
         * @param {Array} values - array of fields that you want to display in the response
         * @example
         * <caption> .only with field uid </caption>
         * blogEntry.only('title')
         * @example
         * <caption> .only with field uid </caption>
         * blogEntry.only('BASE','title')
         * @example
         * <caption> .only with field uids(array) </caption>
         * blogEntry.only(['title','description'])
         * @example
         * <caption> .only with reference_field_uid and field uid </caption>
         * blogEntry.includeReference('category').only('category','title')
         * @example
         * <caption> .only with reference_field_uid and field uids(array) </caption>
         * blogEntry.includeReference('category').only('category', ['title', 'description'])
         * @returns {Entry}
         * @returns {Asset}
         */
        this.only = Utils.transform('only');
        /**
         * @method except
         * @description Displays all data of an entries or assets excluding the data of the specified fields.
         * @param {String} [key=BASE] - BASE (default value) - retrieves default fields of the schema.
                                                             - referenced_content-type-uid - retrieves fields of the referred content type.
         * @param {Array} values - array of fields that you want to skip in the response
         * @example
         * <caption> .except with field uid </caption>
         * Stack.ContentType('contentTypeUid').Query().except('title').toJSON().find()
         * @example
         * <caption> .except with field uid </caption>
         * Stack.ContentType('contentTypeUid').Query().except('BASE','title').toJSON().find()
         * @example
         * <caption> .except with field uids(array) </caption>
         * Stack.ContentType('contentTypeUid').Query().except(['title','description']).toJSON().find()
         * @example
         * <caption> .except with reference_field_uid and field uid </caption>
         * Stack.ContentType('contentTypeUid').Query().includeReference('category').except('category','title').toJSON().find()
         * @example-new
         * <caption> .except with reference_field_uid and field uids(array) </caption>
         * Stack.ContentType('contentTypeUid').Query().includeReference('category').except('category', ['title', 'description']).toJSON().find()
         * @returns {Entry} */
        this.except = Utils.transform('except');
        return this;
    }

    /**
     * @method includeReference
     * @description Fetches the entire content of referenced entry(ies)
     * @example
     * <caption> .includeReference with reference_field_uids as array </caption>
     * blogEntry.includeReference(['category', 'author'])
     * @example
     * <caption> .includeReference with reference_field_uids </caption>
     * blogEntry.includeReference('category', 'author')
     * @returns {Entry}
     */
    includeReference(...val) {
        console.log("value",val)
        if (Array.isArray(val) || typeof val === "string") {
            if (arguments.length) {
                for (let i = 0; i < arguments.length; i++) {
                    this._query['include'] = this._query['include'] || [];
                    this._query['include'] = this._query['include'].concat(arguments[i]);
                }
            }
            console.log("reference",this._query['include'])
            return this;
        } else {
            console.error("Argument should be a String or an Array.");
        }
    }

    /**
    * @method language
    * @description Sets the language code of which you want to retrieve data.
    * @param {String} language_code - language code. e.g. 'en-us', 'ja-jp', etc.
    * @example 
    * let data = blogEntry.language('en-us')
    * data
    *      .then(function(result) {
    *           // result is  an object used to retrieve data of en-us language.
    *      }, function(error) {
    *           // error function
    *      })
    *          
    * @returns {Entry}
    */
    language(language_code) {
        if (language_code && typeof language_code === 'string') {
            this._query['locale'] = language_code;
            return this;
        } else {
            console.error("Argument should be a String.");
        }
    }

    /**
     * @method includeContentType
     * @description Include the details of the content type along with the entry/entries details.
     * @example blogEntry.includeContentType()
     * @returns {Entry}new (require('./modules/entry'))()
     */
    includeContentType() {
        this._query['include_content_type'] = true;
        return this;
    }

    /**new (require('./modules/entry'))()
    * @method fetch
    * @description Fetches a particular entry/asset based on the provided entry UID/asset UID.
    * @example
    * Stack.blogEntry('entry_uid').toJSON().fetch()
    * @example
    * Stack.Assets('assets_uid').toJSON().fetch()
    */
    fetch() {
        if (this.entry_uid) {
            console.log("if")
            return this.db.collection("contents")
                .findOne({ content_type_uid: this.content_type_uid, uid: this.entry_uid })
        } else {
            console.log("else", this._query['locale'])
            return this.db.collection("contents")
                .find({ content_type_uid: this.content_type_uid }).toArray()
            // console.error("Kindly provide an entry uid. e.g. .Entry('bltsomething123')");
        }
    }

}

module.exports = Entry