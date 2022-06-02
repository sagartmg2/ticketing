const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    email:{
        type:String,  
    },
    role_id:{
        type:ObjectId,
        ref:"Role"
    },
    department_ids:{
        type:[ObjectId],
        ref:"Department"
    },
    password:String
});

module.exports = mongoose.model('User', UserSchema);