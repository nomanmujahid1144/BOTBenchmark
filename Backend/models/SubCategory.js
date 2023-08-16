const mongoose = require('mongoose')
const subcategorySchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref : 'Category' },
    subcategory: {
        type: Array,
        default: [],
    },

}, { timestamps: true })

module.exports = mongoose.model('SubCategory', subcategorySchema)