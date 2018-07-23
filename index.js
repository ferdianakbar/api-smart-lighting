var restify = require('restify')
var setupController = require('./controller/setupController.js')
var statusController = require('./controller/statusController.js')
var restifyValidator = require('restify-validator')
var mongo = require('mongoose')
var db = require('./config/dbMongo.js')
var cors = require('cors')
var mqtt = require('mqtt')
var cl = mqtt.connect('mqtt://test.mosquitto.org')


var server = restify.createServer({
    name: 'smart-lighting'
})


mongo.connect(db.getConnection())
setupController(server, restify, restifyValidator, cors)
statusController(server)

server.listen(80, function(){
    console.log('server running on', server.name, server.url)
})

// cl.on('connect', function () {
//     cl.subscribe('/ferdi/helloasdasd')
// })

// cl.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(message.toString())
// })