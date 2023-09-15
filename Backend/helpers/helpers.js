const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");

exports.uploadImage = async (image, next) => {
  console.log("i was called");
  return new Promise((resolve, reject) => {
    if (!image.mimetype.startsWith("image") && !image.mimetype.startsWith("application")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    const path = `${process.env.FILE_UPLOAD_PATH}/${Math.floor(
      Math.random() * 100000 + 1
    )}.${image.name.replace(/\s/g, "")}`;
    image.mv(path, (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 400)); // next func error response
      }
      resolve({
        photoPath: path.slice(8),
      });
    });
  });
}

exports.uploadFile = async (file, next) => {
  return new Promise((resolve, reject) => {

    if (!file.mimetype.startsWith("application") && !file.mimetype.startsWith("pdf")  && !file.mimetype.startsWith("text") ) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const path = `${process.env.FILES_UPLOAD_PATH}/${Math.floor(
      Math.random() * 100000 + 1
    )}.${file.name.replace(/\s/g, "")}`;
    file.mv(path, (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 400)); // next func error response
      }
      resolve({
        photoPath: path.slice(8),
      });
    });
  });
}


exports.calculateAverage = async (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }

  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  const average = total / ratings.length;

  return average;
}
exports.calculatePercentage = async (ratingCount, totalRatings) => {
  return (ratingCount / totalRatings) * 100;
}

exports.countStarRatings = (ratings) => {
  let count1Star = 0;
  let count2Star = 0;
  let count3Star = 0;
  let count4Star = 0;
  let count5Star = 0;

  ratings.forEach((rating) => {
    if (rating >= 4.5) {
      count5Star++;
    } else if (rating >= 3.5) {
      count4Star++;
    } else if (rating >= 2.5) {
      count3Star++;
    } else if (rating >= 1.5) {
      count2Star++;
    } else {
      count1Star++;
    }
  });

  return {
    count1Star,
    count2Star,
    count3Star,
    count4Star,
    count5Star,
  };
}