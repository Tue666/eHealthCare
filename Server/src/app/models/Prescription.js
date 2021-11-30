const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Prescription = new Schema({
    _roomId: {
        type: Number
    },
    medicineId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Prescription', Prescription);
