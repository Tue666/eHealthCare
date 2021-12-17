const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDlete = require('mongoose-delete');

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

Medicine.plugin(mongooseDlete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true
});

module.exports = mongoose.model('Medicine', Medicine);
