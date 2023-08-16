const express = require("express");
const router = express.Router();

const {
  FeedBack,
  GetFeedback,
  GetLatestReviews,
} = require("../controllers/feedback.controllers");
const checkAuth = require("../middleware/check-auth");

router.post('/addfeedback', checkAuth , FeedBack);
router.get('/getfeedback' , checkAuth , GetFeedback);
router.get('/getlatestreviews' ,  GetLatestReviews);

module.exports = router;
