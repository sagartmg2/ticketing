const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    email: String,
    address: {
        street: String,
        ward: Number,
    }
});

module.exports = mongoose.model('User', UserSchema);