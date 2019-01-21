var Utils = require('./lib/utils.js')
// var storage = require('runtime/localstorage.js')
// import * as Utils from "./lib/utils.js";
// import storage from 'runtime/localstorage.js';

function get(key) {
    let data = storage.getItem(key);
    try {
        data = JSON.parse(data);
    } catch (e) {
        return data;
    }
    return data || null;
};

function set(key, data) {
    if (typeof data === 'object') {
        storage.setItem(key, JSON.stringify(data));
    } else {
        storage.setItem(key, data);
    }
};

function getStorage() {
    return storage || null;
};

function getKeys() {
    return (storage) ? Object.keys(storage) : [];
};

module.exports = {get,set,getStorage,getKeys} 