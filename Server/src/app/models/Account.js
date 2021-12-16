const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        maxlength: 10,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'Patient'
    },
    refreshToken: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Account', Account);
