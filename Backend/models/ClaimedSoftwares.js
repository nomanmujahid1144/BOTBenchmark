const mongoose = require('mongoose');
const claimedSoftwareSchema = new mongoose.Schema({
    softwareId: {
        type: mongoose.Schema.Types.ObjectId, ref : 'Software'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref : 'User'
    },
    timePeriod: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    document: {
        type: Object,
        default: {}
    },
    image: {
        type: String,
        default : ''
    },
    subscriptionId: {
        type: String,
        default: ''
    },
    hostedLink: {
        type: String,
        default: ''
    },
    claimed: {
        type: Boolean,
        default: false
    },
    subscriptionExpiry: {
        type: Date,
        index: {
            expiresAfterSeconds: 5 * 24 * 60 * 60
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true })


module.exports = mongoose.model('claimedSoftware', claimedSoftwareSchema);
