const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Department = new Schema({
    _departmentId: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    parentId: {
        type: Number,
        default: null
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
});

mongoose.plugin(slug);
Department.plugin(AutoIncrement, { inc_field: '_departmentId' });

module.exports = mongoose.model('Department', Department);
