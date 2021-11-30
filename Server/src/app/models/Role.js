const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Role = new Schema({
    _roleId: {
        type: Number
    },
    roleText: {
        type: String,
        required: true,
        default: 'Patient'
    }
});

Role.plugin(AutoIncrement, { inc_field: '_roleId' });

module.exports = mongoose.model('Role', Role);
