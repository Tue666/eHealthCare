const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'processing'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', Room);
