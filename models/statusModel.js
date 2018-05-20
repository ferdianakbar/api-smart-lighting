var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var StatusSchema = new Schema({
    id: ObjectId,
    status: String,
    time: Date
});

var statusModel = mongo.model('status', StatusSchema);

module.exports = statusModel;