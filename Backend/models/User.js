const mongoose = require('mongoose');
const User = new mongoose.Schema({
    fullName: {
        type: String,
        default: ''
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add a valid email'
        ],
        unique: [true, "This email already exists"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    geometry : {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
    },
    formattedAddress:{
        type: String,
        default : ''
    },
},
    { timestamps: true })

module.exports = mongoose.model('User', User);
