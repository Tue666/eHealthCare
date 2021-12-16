const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Medicine', Medicine);
