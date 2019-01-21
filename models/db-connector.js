var Contentstack = (require('./core/contentstack'))
var config = require('config')

var Stack = Contentstack.Stack(config.get('url'), config.get('dbName'))

module.exports = Stack
