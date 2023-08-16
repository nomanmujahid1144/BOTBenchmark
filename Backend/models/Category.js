const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    categoryImage: { type: String },
    categoryName: {
        type: String,
        default: '',
        trim: true,
        lowercase: true,
    },
    totalSoftwares: {
        type: Number,
        default : 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)