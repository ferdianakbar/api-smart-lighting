var restify = require('restify')
var setupController = require('./controller/setupController.js')
var statusController = require('./controller/statusController.js')
var restifyValidator = require('restify-validator')
var mongo = require('mongoose')
var db = require('./config/dbMongo.js')


var server = restify.createServer({
    name: 'smart-lighting'
})


mongo.connect(db.getConnection())
setupController(server, restify, restifyValidator)
statusController(server)

server.listen(80, function(){
    console.log('server running on', server.name, server.url)
})
