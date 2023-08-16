const ErrorResponse = require('../utils/errorResponse');
const { uploadImage } = require('../helpers/helpers');
const Categories = require('../models/Category');
const fs            = require('fs');
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Software = require('../models/Software');

exports.addCategory = async (req, res, next) => {
        try {
            console.log( req.query ,'query got here success fully')
            console.log( req.files ,'files got here success fully')
            const categoryName = JSON.parse(req.query.categoryName)
            // const body = req.body;
            if (!req.files) {
                return res.status(200).json({
                    success: false,
                    data: null,
                    message: 'Upload Image'
                })
            }
            const uploadedPath = await uploadImage(req.files.categoryImage, next)
            console.log(uploadedPath, 'path')
            const Category = new Categories({
                categoryImage: uploadedPath.photoPath,
                categoryName : categoryName
            })
            const addedCategory = await Category.save();
            if (!addedCategory) {
                return next(new ErrorResponse('add category failed', 400))
            }
            return res.status(200).json({
                success: true,
                data: addedCategory
            })
        }
        catch (err) {
            return next(new ErrorResponse(err, 400))
        }
}
exports.updateCategory = async (req, res, next) => {
    try {
        console.log( req.query ,'query got here success fully')
        console.log( req.files ,'files got here success fully')
        let body = {
            categoryName : ''
        }; 
        const CN = JSON.parse(req.query.categoryName)
        body.categoryName = CN;
        const id = req.query.id
        if (req.files) {
            const toBeUpdated = await Category.findOne({ _id: mongoose.Types.ObjectId(id) }).select('categoryImage')
            fs.unlink(`${process.env.FILE_DELETE_PATH}${toBeUpdated.categoryImage}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            const uploadedPath = await uploadImage(req.files.categoryImage, next)
            body.categoryImage = uploadedPath.photoPath
        }
        const updatedCategory = await Category.updateOne({ _id: mongoose.Types.ObjectId(id) }, body)
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
exports.getAllCategories = async (req, res, next) => {
    try {
        await Category.find({}, async (err, Categories) => {
            if (err) {
                return next(new ErrorResponse(err, 400))
            } else {
                Categories.forEach(async (category) => {
                    const pipeline = [
                        {
                          $match: {
                            categoryId: mongoose.Types.ObjectId(category._id) // Convert categoryId to ObjectId
                          }
                        },
                        {
                          $count: 'Count'
                        }
                      ];
                  
                    const result = await Software.aggregate(pipeline);
                    category.totalSoftwares = result.length > 0 ? result[0].Count : 0;
                    await category.save();
                })

                if (Categories.length <= 0) {
                    return res.status(200).json({
                        success: true,
                        data: [],
                        message: 'No Category found'
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: Categories,
                    message: "Categories found"
                })
            }
        })
        
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.deleteCategories = async (req, res, next) => {
    try {
        console.log(req.query , 'Ids')
        console.log(req.query.IDS)
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {
            const deletedProducts = await Category.deleteOne({ _id: mongoose.Types.ObjectId(element) })
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


exports.getSingleBrand = async (req, res, next) => {
    console.log(req.query.brand , "Single Brand")
    try {
        const Categories = await Category.findOne({'brand' : req.query.brand})
        console.log(Categories)
        if (Categories.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No Category found'
            })
        }
        return res.status(200).json({
            success: true,
            data: Categories,
            message: "Categories found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.getAllProductsClientSide = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        let resArray = []
        products.forEach(element => {
            let newObj = {
                category: element.category,
                item: element
            }
            resArray.push(newObj)
        });
        return res.status(200).json({
            success: true,
            data: resArray,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}






