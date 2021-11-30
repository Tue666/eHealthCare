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
    roleId: {
        type: Number,
        required: true,
        default: 1
    },
    refreshToken: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Account', Account);
