const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Room = new Schema({
    _roomId: {
        type: Number
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        default: 'Undiagnosed'
    },
    status: {
        type: String,
        default: 'processing'
    },
    updatedBy: {
        type: String,
        default: 'Not update yet'
    }
}, {
    timestamps: true
});

Room.plugin(AutoIncrement, { inc_field: '_roomId' });

module.exports = mongoose.model('Room', Room);
