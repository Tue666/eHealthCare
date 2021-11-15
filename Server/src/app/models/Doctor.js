const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
    name: {
        type: String,
        required: true,
        default: '',
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
