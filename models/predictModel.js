var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var PredictSchema = new Schema({
    id: ObjectId,
    mseStart: String,
    mseEnd: String,
    starTime: String,
    endTime: String
});

var PredictModel = mongo.model('predictlog', PredictSchema);

module.exports = PredictModel;