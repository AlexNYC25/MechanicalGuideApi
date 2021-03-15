let mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: ''
    },
    manufacturer: {
        type: String,
        required: true
    },
    category: {
        type: Array
    }
});

var Switch = new mongoose.model('Switches', schema);

module.exports = Switch;