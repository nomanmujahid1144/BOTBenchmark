const ErrorResponse = require('../utils/errorResponse');
const { uploadImage } = require('../helpers/helpers');
const fs            = require('fs');
const mongoose = require('mongoose');
const SubCategory = require('../models/SubCategory');

exports.addSubCategory = async (req, res, next) => {
    try {
            
            const body = req.body;

            const subcaty = new SubCategory({
                categoryId: body.categoryId,
                subcategory : body.subcategories
            })
        const addedSubCategory = await subcaty.save();
        
            if (!addedSubCategory) {
                return next(new ErrorResponse('add sub category failed', 400))
            }
            return res.status(200).json({
                success: true,
                data: addedSubCategory
            })
        }
        catch (err) {
            return next(new ErrorResponse(err, 400))
        }
}
exports.updateSubCategory = async (req, res, next) => {
    try {
        console.log( req.body ,'query got here success fully')
        
        const id = req.body.subcategoryid;

        let obj = {
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategories,
        }

        const updatedCategory = await SubCategory.updateOne({ _id: mongoose.Types.ObjectId(id) }, obj)
        if (updatedCategory.nModified !== 1) {
            return res.status(200).json({
                data: null,
                message: 'update failed',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: null,
            message: 'Category Updated Successfully'
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.getAllSubCategories = async (req, res, next) => {
    try {
        const subcategories = await SubCategory.find({}).populate('categoryId')
        if (subcategories.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No Sub Category found'
            })
        }
        return res.status(200).json({
            success: true,
            data: subcategories,
            message: "Sub Categories found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.deleteSubCategories = async (req, res, next) => {
    try {
        console.log(req.query , 'Ids')
        console.log(req.query.IDS)
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {
            const deletedProducts = await SubCategory.deleteOne({ _id: mongoose.Types.ObjectId(element) })
            console.log(deletedProducts)
            if (deletedProducts.n >= 1) {
                deletedCount = deletedCount + 1
            }
            console.log(deletedCount, "inside map deleted count")
        })).then(
            () => {
                console.log('deleted count', deletedCount)
                if (req.query.IDS.length === deletedCount) {
                    return res.status(200).json({
                        success: true,
                        message: "Deleted Successfully",
                        data: null
                    })
                }
                else {
                    return res.status(400).json({
                        success: false,
                        data: null,
                        message: 'deletion failed'
                    })
                }

            }

        );

    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}





