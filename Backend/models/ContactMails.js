const mongoose = require('mongoose');
const ContactMail = new mongoose.Schema({
    fullName: {
        type: String,
        default: ''
    },
    emailId: {
        type: String,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please add a valid email'
        ],
        unique: false,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
},
    { timestamps: true })

module.exports = mongoose.model('ContactMails', ContactMail);
