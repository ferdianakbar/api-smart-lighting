helpers = require('../config/helper.js')
statusModel = require('../models/statusModel.js')
//mqttModel = require('../models/mqttModel.js')

var mqtt = require('mqtt')
var clmqtt = mqtt.connect('mqtt://18.188.184.186')


module.exports = function(server) {
    server.get('/', function(req, res, next){
        helpers.success(res, next, 'this server running')
    }) 

    server.post('/api/status', function(req, res, next) {
        status = new statusModel()
        var time = new Date()
        console.log(time.toUTCString)
        status.status = req.params.status
        console.log(status.status)
        status.time = time.toUTCString()
        console.log(time)

        status.save(function (err){
            if (err){
                helpers.failure(res, next, 'your request is false', 400)
            } else {
                
                clmqtt.publish('/status/smart-lamp', req.params.status)
                helpers.success(res, next, status)
            }
        })
    })

    //get last status
    server.get('/api/status', function (req, res, next){
        statusModel.find({}, function(err, status){
            helpers.success(res, next, status);
        }).findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    }) 
}