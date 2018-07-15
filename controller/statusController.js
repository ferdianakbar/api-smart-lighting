helpers = require('../config/helper.js')
statusModel = require('../models/statusModel.js')
sleepLog = require('../models/sleepLogModel.js')
predictModel = require('../models/predictModel.js')
usermode = require('../models/userModel.js')
//mqttModel = require('../models/mqttModel.js')

var mqtt = require('mqtt')
var clmqtt = mqtt.connect('mqtt://test.mosquitto.org')


module.exports = function(server) {
    server.get('/', function(req, res, next){
        helpers.success(res, next, 'this server running')
    }) 

    server.post('/api/status', function(req, res, next) {
        status = new statusModel()
        var time = new Date()
        status.tanggal = time.toLocaleDateString()
        status.status = req.params.status.toLowerCase()
        status.auto = req.params.auto

        if (req.params.startTime != null){
            status.time.push(req.params.startTime)    
        } else {
            status.time.push('-1')
        }

        if (req.params.endTime != null){
            status.time.push(req.params.endTime)    
        } else {
            status.time.push('-1')
        }

        console.log(status)

        status.save(function (err){
            if (err){
                helpers.failure(res, next, 'your request is false', 400)
            } else {
                clmqtt.publish('/TA-ferdi/status/smart-lamp', req.params.status)
                if (status.auto == true){
                    mssg =  status.time[0]+'&'+status.time[1]
                    clmqtt.publish('/TA-ferdi/status/smart-lamp', mssg)
                }
                helpers.success(res, next, status, 201)
            }
        })
    })

    //get last status
    server.get('/api/status', function (req, res, next){
        statusModel.find({}, function(err, status){
            helpers.success(res, next, status, 200);
        }).findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    }) 

    //get last sleep log by day
    server.get('/api/sleep-log/:days', function (req, res, next){
        days = parseInt(req.params.days)
        console.log(days)
        sleepLog.find({}, function(err, data){
            helpers.success(res, next, data, 200);
        }).sort({ _id: -1 }).limit(days);
    }) 

    //save sleep log
    server.post('/api/sleep-log/add', function (req, res, next){
        sleeplog = new sleepLog()
        sleeplog.tanggal = req.params.tanggal
        sleeplog.start = req.params.start
        sleeplog.end = req.params.end
        //console.log(sleeplog)

        sleeplog.save(function (err){
            if (err){
                helpers.failure(res, next, 'cant post data', 400)
            } else {
                helpers.success(res, next, sleeplog,201)
            }
        })
    }) 

    //save predict data
    server.post('/api/predict/add', function (req, res, next){
        predict = new predictModel()
        if (req.params.tanggal == null){
            var time = new Date()
            predict.tanggal = time.toLocaleDateString()
        } else {
            predict.tanggal = req.params.tanggal
        }
        predict.mseStart = req.params.mseStart
        predict.mseEnd = req.params.mseEnd
        predict.startTime = req.params.startTime
        predict.endTime = req.params.endTime
        //console.log(predict)

        predict.save(function (err){
            if (err){
                helpers.failure(res, next, 'cant post data', 400)
            } else {
                helpers.success(res, next, predict, 201)
            }
        })
    })

    //get last predict data
    server.get('/api/predict', function (req, res, next){
        predictModel.find({}, function(err, status){
            helpers.success(res, next, status, 200);
        }).findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    })

    //get last n predict data 
    server.get('/api/predict/:days', function (req, res, next){
        days = parseInt(req.params.days)

        predictModel.find({}, function(err, status){
            helpers.success(res, next, status, 200);
        }).sort({ _id: -1 }).limit(days);
    })
}