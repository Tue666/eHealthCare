const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Insurance = new Schema({
    _insuranceId: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true,
        default: 0
    },
    percentPay: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    },
    moneyPay: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
});

Insurance.plugin(AutoIncrement, { inc_field: '_insuranceId' });

module.exports = mongoose.model('Insurance', Insurance);
