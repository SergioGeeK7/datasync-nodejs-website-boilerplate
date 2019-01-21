var Utils = require('./lib/utils')
var Entry = new (require('./modules/entry'))()
var Assets = require('./modules/assets')
var Query = require('./modules/query')
var Request = require('./lib/request')
const MongoClient = require('mongodb').MongoClient

class Stack {

    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
        this.db;
        this.db_connect().then((dbInstance) => {
            this.db = dbInstance
        }).catch((err) => {
            console.log("failed to connect to database.", err)
        })

        // Ask node to run your function before exit:

        // This will handle process.exit():
        process.on('exit', this.gracefulShutdown);

        // This will handle kill commands, such as CTRL+C:
        process.on('SIGINT', this.gracefulShutdown);
        process.on('SIGTERM', this.gracefulShutdown);

        // This will prevent dirty exit on code-fault crashes:
        process.on('uncaughtException', this.gracefulShutdown);
    }

    // Create a function to terminate your app gracefully:
    gracefulShutdown() {
        // First argument is [force], see mongoose doc.
        this.db.close(false, () => {
            console.log('MongoDb connection closed.');
        });
    }

    db_connect() {
        var url = this.url,
            dbName = this.dbName
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true }, function (error, client) {
                if (error) {
                    reject(error)
                } else {
                    console.log("connection established")
                    let db_instance = client.db(dbName)
                    resolve(db_instance)
                }
            })
        })
    }


    ContentType(uid) {
        if (uid && typeof uid === 'string') {
            this.content_type_uid = uid;
            this.type = "contentType";
        }
        return this;
    }

    /**
     * @method Entry
     * @description Retrieves the entry based on the specified UID 
     * @param {String} uid - uid of entry you want to retrieve
     * @example 
     * let data = Stack.ContentType('blog').Entry('bltsomething123').toJSON().fetch()
     *      data
     *      .then(function(result) {
     *           // ‘result’ is a single entry object of specified uid       
     *      }, function(error) {
     *           // error function
     *      })
     * @returns {Entry}
     */
    Entry(uid) {
        let entry = Entry
        if (uid && typeof uid === "string") {
            entry.entry_uid = uid;
        }
        return Utils.merge(entry, this);
    }

    /**
     * @method Assets
     * @description Retrieves the asset based on the specified UID
     * @param {String} uid - uid of asset you want to retrieve
     * @example 
     * let data = Stack.Assets('bltsomething123').toJSON().fetch()
     *      data
     *      .tlog
     *        loge asset object of specified uid       
     *      },log
     *        log
     *      })log
     * @returns {Assets}
     */
    Assets(uid) {
        this.type = 'asset';
        if (uid && typeof uid === "string") {
            let asset = Assets
            asset.asset_uid = uid;
            return Utils.merge(asset, this);
        }
        return this;
    }

    /**
     * @method Query
     * @description Provides suplogfor all search queries
     * @example Stack.ContentTyplogog').Query().toJSON().find()
     * @returns {Query}
     */
    Query() {
        let query = Query;
        return Utils.merge(query, this);
    }

}

module.exports = Stack
