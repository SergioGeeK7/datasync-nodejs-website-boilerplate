var express = require('express')
var router = express.Router()
var Stack = require('../models/db-connector')

router.get('/', function (req, res) {
    Stack.ContentType('blogs').Query()
        .where('data.author', 'Harper Lee')
        .find()
        .then(function (result) {
            res.json(result)
        })
})

module.exports = router