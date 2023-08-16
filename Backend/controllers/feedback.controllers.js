
const FeedBack = require("../models/FeedBack");
const Software = require("../models/Software");
const mongoose = require("mongoose");


exports.FeedBack = async (req, res) => {
    console.log(req.body, ':Feedback Body Data')
    console.log(req.user, ':Feedback Body Data')
  
    const userId = req.user.data[1];

    const feedback = await new FeedBack({
        softwareId: req.body.softwareId,
        feedback: req.body.feedback,
        reviewTitle: req.body.reviewTitle,
        rating: req.body.rating,
        userId: userId,
    })
  
    await feedback.save();
  
    await Software.findOne({ _id: mongoose.Types.ObjectId(req.body.softwareId) }, (err, findSoftware) => {
      if (err) {
  
      } else {
          console.log(findSoftware)
          findSoftware.feedbacks.push(feedback._id);
          findSoftware.save();
      }
    })
  
    return res.status(200).json({
      success: true,
      message: "Feedback Successfully Saved",
      data: feedback,
    });
  
};
  
  
  exports.GetFeedback = async (req, res, next) => {
    console.log(req.user.data[1], "users id");
    try {
      let user = await User.findOne({ _id: mongoose.Types.ObjectId(req.user.data[1]) },{
          feedbacks: 1,
          _id: 0
        }).populate({
          path: 'feedbacks',
          populate: {
            path: 'influencerId',
            select: 'fullName profilePhoto location createdAt'
          }
        })
  
      console.log(user, 'Rating user')
  
      if (user) {
        return res.status(200).json({
          success: true,
          message: "user found",
          data: user,
        });
      }
      return res.status(200).json({
        success: true,
        message: "user not found",
        data: user,
      });
    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
  };


exports.GetLatestReviews = async (req, res, next) => {
  try {
    const latestReviews = await FeedBack.find({})
      .sort({ date: -1 }) // Sort by date in descending order (latest first)
      .limit(10)
      .populate('userId', {__v : 0, updatedAt: 0, createdAt: 0, password: 0, geometry: 0,  }) // You can adjust the limit as per your requirement (e.g., fetch 10 latest reviews)
      .populate('softwareId', {__v : 0, updatedAt: 0, createdAt: 0, }); // You can adjust the limit as per your requirement (e.g., fetch 10 latest reviews)

    console.log(latestReviews)
    
    return res.status(200).json({
      success: true,
      message: 'Latest Reviews',
      data: latestReviews,
    });
  } catch (error){
    return res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
}