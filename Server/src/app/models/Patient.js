const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema({
    accountId: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    familyPhone: {
        type: String,
        maxlength: 10,
        required: true,
        default: ''
    },
    sex: {
        type: String,
        default: ''
    },
    bloodGroup: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    heartBeat: {
        type: Number,
        default: 0
    },
    insuranceID: {
        type: Number,
        default: null
    },
    insuranceTime: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', Patient);
