const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema({
    accountId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: '',
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        default: '',
    },
    phone: {
        type: String,
        maxlength: 10,
        required: true,
        default: ''
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
