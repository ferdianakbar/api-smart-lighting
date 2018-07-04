var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var StatusSchema = new Schema({
    id: ObjectId,
    tanggal: String,
    status: String,
    auto: Boolean,
    time: []
});

var statusModel = mongo.model('status', StatusSchema);

module.exports = statusModel;