const ErrorResponse = require('../utils/errorResponse');
const Software = require('../models/Software');
const User = require('../models/User');
const Category = require('../models/Category');
const { uploadImage, calculateAverage, calculatePercentage, countStarRatings } = require('../helpers/helpers');
const he = require('he');
const multer = require("multer");
const path            = require('path');
const fs            = require('fs');
const sharp            = require('sharp');
const mongoose = require('mongoose');

exports.addSoftware = async (req, res, next) => {
    try {
            console.log(req.query, 'req.query')
            const body = JSON.parse(req.query.values)
            body.description = he.decode(body.description);
            console.log(body.subcategory, 'SubCategory-herer-----============')
            if (!req.files) {
                return res.status(200).json({
                    success: false,
                    data: null,
                    message: 'Upload Image'
                })
            }
            const uploadedPath = await uploadImage(req.files.softwareLogo, next)

            const software = new Software({
                softwareName: body.softwareName,
                categoryId: body.categoryId,
                subcategory: body.subcategory,
                description: body.description,
                contacts: body.contacts,
                softwareLogo: uploadedPath.photoPath
            })
            const addedsoftware = await software.save()
            if (!addedsoftware) {
                return next(new ErrorResponse('add Software failed', 400))
            }
            return res.status(200).json({
                success: true,
                data: addedsoftware
            })
        }
        catch (err) {
            return next(new ErrorResponse(err, 400))
        }
} 

exports.getAllSoftwares = async (req, res, next) => {
    try {
        const softwares = await Software.find({}).populate('categoryId')
        if (softwares.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found'
            })
        }
        return res.status(200).json({
            success: true,
            data: softwares,
            message: "softwares found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getFilteredSoftwares = async (req, res, next) => {
    try {

        console.log(req.query, 'Query')


        // Your query parameters
        const category = req.query.category;
        const subCategory = req.query?.subCategories === undefined ? [] : req.query?.subCategories?.length !== 0 ? req.query?.subCategories : []; // or ['jera'] or ['jera', 'slack']
        const dateFilter = req.query.dateFilter; // Get the dateFilter value
        const ratingFilter = req.query.rating;

        const categoryFind = await Category.findOne({ categoryName: category });
        
        if (!categoryFind) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found',
            });
        }

        let searchConditions;

        if (subCategory.length > 0) {
            searchConditions = [
                { categoryId: categoryFind._id }, // Match categoryId
                { subcategory: { $in: subCategory } }, // Match any subcategory from the subcategory list
            ];
        } else {
            searchConditions = [
                { categoryId: categoryFind._id }, // Match categoryId
            ];
        }

        // Apply dateFilter logic
        let sortOptions = {};
        if (dateFilter === 'latest') {
        sortOptions = { createdAt: -1 }; // Sort by date in descending order for latest
        } else if (dateFilter === 'oldest') {
        sortOptions = { createdAt: 1 };  // Sort by date in ascending order for oldest
        }

        // Apply ratingFilter logic
        if (ratingFilter !== 'any') {
            searchConditions.push({ averageRating : { $gte: parseFloat(ratingFilter) } });
        }

        const softwares = await Software.find({ $and: searchConditions })
            .sort(sortOptions)
            .populate('categoryId')
        
        softwares.forEach((software) => {
            console.log(software.softwareName)
        })

        // Check if any softwares were found
        if (softwares.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found',
            });
        }
        

        // Now you have the filtered softwares with their corresponding category information
        return res.status(200).json({
            success: true,
            data: softwares,
            message: 'Softwares found',
        });
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getSingleSoftware = async (req, res, next) => {
    try {
        const softwareId = req.query.softwareId;

        await Software.findOne({ _id: mongoose.Types.ObjectId(softwareId) })
            .populate('categoryId', {__v: 0, createdAt: 0, updatedAt: 0})
            .populate({
                path: 'feedbacks',
                select: '-__v',
                populate: {
                  path: 'userId',
                  model: User,
                  select: '-__v -password ', // Select the fields you want to exclude from the populated user document
                },
              }).exec(async (err, software) => {
                
                if (err) {
                    
                } else {
                    const ratings = software.feedbacks.map((feedbackObj) => feedbackObj.rating);
                    const maxRating = 5; // Assuming the maximum rating is 5
                    
                    // Scale the ratings to the 0-5 range
                    const scaledRatings = ratings.map((rating) => (rating / maxRating) * 5);
                    
                    // Calculate the average rating
                    const averageRating =await calculateAverage(scaledRatings);
                    
                    const totalRatings = software.feedbacks.length;
                    
                    console.log(`Average Rating: ${averageRating.toFixed(1)} out of 5 based on ${totalRatings} user ratings`);

                    software.averageRating = averageRating.toFixed(1);
                    software.totalRatings = totalRatings;

                    const starRatingsCounts =await countStarRatings(ratings);


                    const percentage1Star =await calculatePercentage(starRatingsCounts.count1Star, totalRatings);
                    const percentage2Star =await calculatePercentage(starRatingsCounts.count2Star, totalRatings);
                    const percentage3Star =await calculatePercentage(starRatingsCounts.count3Star, totalRatings);
                    const percentage4Star =await calculatePercentage(starRatingsCounts.count4Star, totalRatings);
                    const percentage5Star =await calculatePercentage(starRatingsCounts.count5Star, totalRatings);

                    software.percentageOfEachStart.star1 = isNaN(percentage1Star) ? 0 : percentage1Star.toFixed(0);
                    software.percentageOfEachStart.star2 = isNaN(percentage2Star) ? 0 : percentage2Star.toFixed(0);
                    software.percentageOfEachStart.star3 = isNaN(percentage3Star) ? 0 : percentage3Star.toFixed(0);
                    software.percentageOfEachStart.star4 = isNaN(percentage4Star) ? 0 : percentage4Star.toFixed(0);
                    software.percentageOfEachStart.star5 = isNaN(percentage5Star) ? 0 : percentage5Star.toFixed(0);

                    software.feedbacks.forEach((software) => console.log(software))
                    await software.save();

                    if (!software) {
                        return res.status(200).json({
                            success: true,
                            data: [],
                            message: 'No software found'
                        })
                    }
                    return res.status(200).json({
                        success: true,
                        data: software,
                        message: "software found"
                    })      
                }
            })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.updateSoftware = async (req, res, next) => {
    try {
        let body = JSON.parse(req.query.values);
        console.log(body)
        body.description = he.decode(body.description);
        const id = req.query.id;
        if (req.files) {
            const toBeUpdated = await Software.findOne({ _id: mongoose.Types.ObjectId(id) }).select('softwareLogo')
            fs.unlink(`${process.env.FILE_DELETE_PATH}${toBeUpdated.softwareLogo}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            const uploadedPath = await uploadImage(req.files.softwareLogo, next)
            body.softwareLogo = uploadedPath.photoPath
        }

        const updatedProduct = await Software.updateOne({ _id: mongoose.Types.ObjectId(id) }, body)
        if (updatedProduct.nModified !== 1) {
            return res.status(200).json({
                data: null,
                message: 'update failed',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: null,
            message: 'Software Updated Successfully'
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


exports.deleteSoftwares = async (req, res, next) => {
    try {
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {
            const photoPath = await Software.findOne({ _id: mongoose.Types.ObjectId(element) }).select('softwareLogo')
            fs.unlink(`${process.env.FILE_DELETE_PATH}${photoPath.softwareLogo}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            const deletedsoftwares = await Software.deleteOne({ _id: mongoose.Types.ObjectId(element) })
            if (deletedsoftwares.n >= 1) {
                deletedCount = deletedCount + 1
            }

        })).then(
            () => {
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
exports.getSearchSoftwares = async (req, res, next) => {
    try {

        console.log(req.query, 'Query')
        const { query } = req.query;
        const regex = new RegExp(query, 'i');
        const softwares = await Software.find({ softwareName : regex }).sort({ date: -1 }).limit(5)

        console.log(softwares)
        const softwareArray = [];

        if (softwares.length > 0) {
            softwares.forEach((software) => {
                let obj = {
                    id: software._id,
                    name: software?.softwareName,
                    rating: software?.averageRating
                }
                softwareArray.push(obj);
            })
        }

        // Check if any softwares were found
        if (softwares.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found',
            });
        }
        

        // Now you have the filtered softwares with their corresponding category information
        return res.status(200).json({
            success: true,
            data: softwareArray,
            message: 'Softwares found',
        });
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.addDescriptionImage = async (req, res, next) => {
    try {
      console.log(req.files, 'Files Image')
  
      if (!req.files) {
        return res.status(200).json({
            success: false,
            data: null,
            message: 'Upload Image'
        })
    }
    const uploadedPath = await uploadImage(req.files.image, next)
  
      const path = process.env.LIVE_SERVER_URL + uploadedPath?.photoPath;
    return res.status(200).json({
        success: true,
        url: path,
        message : 'Successfully Uploaded Image'
    })
  
    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
  };


exports.getFeatureProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ featureProduct : true})
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getdiscountproducts = async (req, res, next) => {
    try {
        const products = await Product.find({ price: { $lt: 40 } })
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getdiscountproducts = async (req, res, next) => {
    try {
        const products = await Product.find({ price: { $lt: 40 } })

        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getProductByBrand = async (req, res, next) => {
    try {
        const products = await Product.find({'brand' :  req.query.brand})
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}
exports.getProductByBrandWithCategory = async (req, res, next) => {
    
    let obj = {} ; 
    let inner = [{ brand: req.query.brand }];
    if(req.query.category != ''){
        inner.push({category: req.query.category})
    }
    if(req.query.subCategory != ''){
        inner.push({subCategory: req.query.subCategory})
    }
    if(req.query.type != ''){
        inner.push({type: req.query.type})
    }
    obj = { $and : inner}
    try {
        const products = await Product.find(obj)
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No products found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "Products found"
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



exports.addToFavourite = async (req, res, next) => {
    try {
        const body = req.body.favoutite

        const favourites = {
            favourite : body
        }
        const id = req.body.id

        const updatedProduct = await Product.updateOne({ _id: mongoose.Types.ObjectId(id) }, favourites)
        if (updatedProduct.nModified !== 1) {
            return res.status(200).json({
                data: null,
                message: 'update failed',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: null,
            message: 'Product Updated Successfully'
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.getAllFavourites = async (req, res, next) => {
    try {
        const products = await Product.find({'favourite' : true})
        if (products.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No Favourite product found'
            })
        }
        return res.status(200).json({
            success: true,
            data: products,
            message: "All Favourite Products found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}