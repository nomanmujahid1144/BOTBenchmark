const mongoose = require('mongoose');
const softwareSchema = new mongoose.Schema({
    softwareName: {
        type: String,
        default: ''
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref : 'Category'
    },
    subcategory: [{
        type: String,  // Specify that subcategory is an array of strings
    }],
    description: {
        type: String,
        default: ''
    },
    contacts: {
        webLink: String,
        email: String,
        contactno: String,
        location: {
            address : String
        },
    },
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Feedback' 
    }],
    totalRatings: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
    percentageOfEachStart: {
        star1 : {type: String, default: ''},
        star2 : {type: String, default: ''},
        star3 : {type: String, default: ''},
        star4 : {type: String, default: ''},
        star5 : {type: String, default: ''},
    },
    softwareLogo: { type: String },
}, { timestamps: true })


module.exports = mongoose.model('Software', softwareSchema);
