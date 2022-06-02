const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DepartmentSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Department', DepartmentSchema);