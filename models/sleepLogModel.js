var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var SleeplogSchema = new Schema({
    id: ObjectId,
    tanggal: String,
    start: String,
    end: String
});

var sleeplogModel = mongo.model('sleeplogs', SleeplogSchema);

module.exports = sleeplogModel;