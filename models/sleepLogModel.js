var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var SleeplogSchema = new Schema({
    id: ObjectId,
    tanggal: String,
    start: String,
    end: String
});
// asli
// var sleeplogModel = mongo.model('sleeplogs', SleeplogSchema);

// test 
var sleeplogModel = mongo.model('sleeplogss', SleeplogSchema);

module.exports = sleeplogModel;