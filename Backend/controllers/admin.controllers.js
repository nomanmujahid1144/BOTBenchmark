const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/Admin');
const { uploadImage } = require('../helpers/helpers');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.adminSignup = async (req, res, next) => {
    try {
        console.log(req.body)

        let adminInfo = await Admin.findOne({ email: req.body.email });

        if (adminInfo) {
            return res.status(200).json({
                success: true,
                message: "Account with this email already exixts",
                data: adminInfo
            })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)

            let admin = new Admin({
                name : req.body.name,
                email: req.body.email,
                password: hash 
            })
            const token =  jsonwebtoken.sign(
                {
                data: [admin.email, admin._id],
                role: "admin",
                },
                "" + process.env.JWT_SECRET
            );
            const result = await admin.save();
            if (!result) {
                return next(new ErrorResponse('Signup failed', 400))
            }
            return res.status(200).json({
                success: true,
                message: "Create Account Successfully",
                token
            })
        }

        
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.adminLogin = async (req, res, next) => {
    try {
        const result = await Admin.findOne({ email: req.body.email });
        if (!result) {
            // this means result is null
            return next(new ErrorResponse('Incorrect email address', 200))
        } else {
            // email did exist
            // so lets match password
            if (bcrypt.compareSync(req.body.password, result.password)) {
                // great, allow this user access
                const token = jsonwebtoken.sign({
                    data: [result.email, result._id],
                    role: 'admin'
                }, "" + process.env.JWT_SECRET);
                console.log(token);
                return res.status(200).json({
                    success: true,
                    message: 'Successfully Logged in',
                    token: token
                });
            }
            else {
                return next(new ErrorResponse('Incorrect password', 200))
            }
        }
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}



exports.getAdmin = async (req, res, next) => {

    try {
        const alreadyPresent = await Admin.findOne({})
        console.log(alreadyPresent)
        if (alreadyPresent) {
            return res.status(200).json({
                success: true,
                message: 'Got Admin Successfully',
                data: alreadyPresent
            });

        }
        return res.status(200).json({
            success: false,
            message: 'No Admin Found',
            data: null
        });


    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}


// exports.getDashboardData = async (req, res, next) => {

//     try {
//         let ordersPending = await Order.aggregate([
//             {
//                 $facet: {
//                     "totalPendingOrders": [
//                         { $match: { status: 0 } },
//                         { $count: "totalPendingOrders" },
//                     ],
//                     "last24HoursPendingOrders": [
//                         { $match: { status: 0, "updatedAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
//                         { $count: "last24HoursPendingOrders" }
//                     ],
//                 }
//             },
//             {
//                 $project: {
//                     "totalPendingOrders": { "$arrayElemAt": ["$totalPendingOrders.totalPendingOrders", 0] },
//                     "last24HoursPendingOrders": { "$arrayElemAt": ["$last24HoursPendingOrders.last24HoursPendingOrders", 0] },
//                 }
//             }
//         ])

//         let ordersAll = await Order.aggregate([
//             {
//                 $facet: {
//                     "totalAllOrders": [
//                         { $count: "totalAllOrders" },
//                     ],
//                     "last24HoursAllOrders": [
//                         { $match: { "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
//                         { $count: "last24HoursAllOrders" }
//                     ],
//                 }
//             },
//             {
//                 $project: {
//                     "totalAllOrders": { "$arrayElemAt": ["$totalAllOrders.totalAllOrders", 0] },
//                     "last24HoursAllOrders": { "$arrayElemAt": ["$last24HoursAllOrders.last24HoursAllOrders", 0] },
//                 }
//             }
//         ])
//         let ordersCompleted = await Order.aggregate([
//             {
//                 $facet: {
//                     "totalCompletedOrders": [
//                         { $match: { status: 5 } },
//                         { $count: "totalCompletedOrders" },
//                     ],
//                     "last24HoursCompletedOrders": [
//                         { $match: { status: 5, "updatedAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
//                         { $count: "last24HoursCompletedOrders" }
//                     ],
//                 }
//             },
//             {
//                 $project: {
//                     "totalCompletedOrders": { "$arrayElemAt": ["$totalCompletedOrders.totalCompletedOrders", 0] },
//                     "last24HoursCompletedOrders": { "$arrayElemAt": ["$last24HoursCompletedOrders.last24HoursCompletedOrders", 0] },
//                 }
//             }
//         ])
//         let productsAdded = await Product.aggregate([
//             {
//                 $facet: {
//                     "totalAddedProducts": [
//                         { $count: "totalAddedProducts" },
//                     ],
//                     "last24HoursAddedProducts": [
//                         { $match: {"createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
//                         { $count: "last24HoursAddedProducts" }
//                     ],
//                 }
//             },
//             {
//                 $project: {
//                     "totalAddedProducts": { "$arrayElemAt": ["$totalAddedProducts.totalAddedProducts", 0] },
//                     "last24HoursAddedProducts": { "$arrayElemAt": ["$last24HoursAddedProducts.last24HoursAddedProducts", 0] },
//                 }
//             }
//         ])

//         if (ordersPending) {
//             return res.status(200).json({
//                 success: true,
//                 message: 'Got Dashboard Data Successfully',
//                 data: [
//                     ordersAll[0],
//                     ordersPending[0],
//                     ordersCompleted[0],
//                     productsAdded[0]
//                 ]
//             });

//         }
//         return res.status(200).json({
//             success: false,
//             message: 'No Dashboard Data Found',
//             data: []
//         });


//     }
//     catch (err) {
//         return next(new ErrorResponse(err, 400))
//     }
// }
