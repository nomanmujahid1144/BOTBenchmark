const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    claimedSoftwares: [{
        software: {
            type: Schema.Types.ObjectId,
            ref: 'Software',
            required: true,
        },
        subscriptionExpiry: {
            type: Date,
            required: true,
        },
    }],
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
