const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema({
    accountId: {
        type: String,
        required: true
    },
    departmentId: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    dutyDay: {
        type: Array,
        required: []
    },
    dutyFrom: {
        type: String,
        required: true
    },
    dutyTo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', Doctor);
