var mongo = require('mongoose')

var Schema = mongo.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String
});

var UserModel = mongo.model('slog', UserSchema);

module.exports = UserModel;