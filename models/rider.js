const mongoose = require('mongoose')


const rideSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vtype: {
        type: String,
        required: true
    },
    vnum: {
        type: String,
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    dest: {
        type: String,
        required: true
    },
    departTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    fare: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Ride',rideSchema)