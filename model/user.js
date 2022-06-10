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
    refresh_tokens:{
        type:[]
    },
    password:String,

    // password:{
    //     type:String,
    //     select:false      TODO: this will not return password feild on find()  . . search for a way to return password  
    // }
});

module.exports = mongoose.model('User', UserSchema);