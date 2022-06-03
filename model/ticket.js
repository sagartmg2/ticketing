const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TicketSchema = new Schema({
    title: String,
    description: String,
    department_ids: {
        type: [ObjectId],
        ref: "Department"
    },
    created_by: {
        type: ObjectId,
        ref: user,
    },
    status: {
        enum: ["pending", "in_process", "completed"],
        type: String,
        default: "pending"
    },
    priority: {
        enum: ["high", "medium", "low"],
        type: String,
        default: "low"
    },
    images: {
        type: [String],
    }
    // https://www.npmjs.com/package/multer
});

module.exports = mongoose.model('Ticket', TicketSchema);