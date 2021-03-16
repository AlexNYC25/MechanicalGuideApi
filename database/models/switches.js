let mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    category: {
        type: Array
    },
    avgCost: {
        type: Number
    },
    actuactionForce: {
        type: Number
    },
    bottomForce: {
        type: Number
    },
    springWeight: {
        type: Array
    },
    actuationDistance: {
        type: Number
    },
    travelDistance: {
        type: Number
    },
    mainImage: {
        type: String
    },
    images: {
        type: Array
    },
    manufacturerDesctiption: {
        type: String
    }
});

var Switch = new mongoose.model('Switches', schema);

module.exports = Switch;