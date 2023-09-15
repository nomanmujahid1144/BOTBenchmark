const ErrorResponse = require('../utils/errorResponse');
const ClaimedSoftware = require('../models/ClaimedSoftwares');
const User = require('../models/User');
const { uploadImage, uploadFile } = require('../helpers/helpers');
const he = require('he');
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// const { createCanvas, loadImage } = require('canvas');

var chargebee = require("chargebee");
chargebee.configure({site : process.env.SITE , api_key : process.env.CHARGEBEE_API_KEY})

exports.addClaimedSoftwares = async (req, res, next) => {
    try {
        
        const userId = req.user.data[1];
        const phoneNumber = JSON.parse(req.query.phoneNumber);
        const softwareId = JSON.parse(req.query.softwareId);
        const price = JSON.parse(req.query.timeperiod);
        const subscriptionDurationInDays = price === '9.99' ? 30 : 365; // or 365 for 1 year

        let FileUploaded;
        let document = {};
        if (req.files?.document) { 
            FileUploaded = await uploadFile(req.files?.document, next)
            console.log(FileUploaded)
            document = {
                path: FileUploaded.photoPath,
                name: req.files.document.name,
                size: req.files.document.size
            }
        } else {
            FileUploaded = await uploadImage(req.files?.image, next)
        }

        const subscriptionExpiry = new Date();
        subscriptionExpiry.setDate(subscriptionExpiry.getDate() + subscriptionDurationInDays);
  
        const claimedSoftware = new ClaimedSoftware({
            timePeriod: subscriptionDurationInDays,
            document: document,
            softwareId: softwareId,
            userId: userId,
            phoneNumber: phoneNumber,
            image: req.files?.image ? FileUploaded.photoPath : '',
            // subscriptionExpiry
        })
        const claimed = await claimedSoftware.save();
  
        if (!claimed) {
            return res.status("User Update Failed", 400);
        } else {
            return res.status(200).json({
            success: true,
            message: "Claimed Software Saved Successfully",
            data: claimed,
            });
        }
  
    } catch (err) {
      return next(new ErrorResponse(err, 400));
    }
};

exports.getAllClaimedSoftwares = async (req, res, next) => {
    try {
        const softwares = await ClaimedSoftware.find({})
            .populate('softwareId')
            .populate('userId')
        if (softwares.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found'
            })
        }

        console.log(softwares, 'software')

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

exports.CreateCheckoutForNewSubscription = async (req, res, next) => {
    try {
        console.log('HERE')
        console.log(req.body)
        const claimedSoftwareid = req.body.claimedSoftwareid;

        const claimedSoftware = await ClaimedSoftware.findOne({_id: mongoose.Types.ObjectId(claimedSoftwareid)}).populate('userId').populate('softwareId')
        
        console.log(claimedSoftware);

        if (claimedSoftware) {
            chargebee.item.retrieve("Claim-Profile").request(function(error,result) {
                if(error){
                  //handle error
                  console.log(error);
                }else{
                    console.log(result);
                    var item = result.item;

                    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
                    const expirationTimestamp = currentTimestamp + 5 * 24 * 60 * 60; // 5 days in seconds
                    chargebee.hosted_page.checkout_new_for_items({
                        subscription_items : [{
                            item_price_id : claimedSoftware?.timePeriod === '30' ? "Claim-Profile-USD-Monthly" : "Claim-Profile-USD-Yearly" ,
                            unit_price: claimedSoftware?.timePeriod === '30' ? 9.99 * 100 : 99.99 * 100,
                        }],
                        pass_thru_content: `${claimedSoftware?.softwareId?._id}`,
                        expires_at: expirationTimestamp,
                    }).request(function(error,result) {
                        if(error){
                          //handle error
                          console.log(error);
                        }else{
                            var hosted_page = result.hosted_page;
                            console.log(result)
                            ejs.renderFile(
                                __dirname + "/../views/email.ejs",
                                {
                                    username: claimedSoftware?.userId?.fullName,
                                    email: claimedSoftware?.userId?.email,
                                    softwareName: claimedSoftware?.softwareId?.softwareName,
                                    duration: claimedSoftware?.timePeriod === '30' ? "Monthly" : "Yearly",
                                    link: hosted_page?.url
                                },
                                function (err, data) {
                                    if (err) return err;
                                    else { 
                                        const oauth2Client = new OAuth2(
                                            process.env.CLIENT_ID, // ClientID
                                            process.env.CLIENT_SECRET, // Client Secret
                                            process.env.REDIRECT_URL // Redirect URL
                                        );
                                        oauth2Client.setCredentials({
                                            refresh_token: process.env.REFRESH_TOKEN,
                                        });
                                        const accessToken = oauth2Client.getAccessToken();

                                        const transporter = nodemailer.createTransport({
                                            service: "gmail",
                                            auth: {
                                              type: "OAuth2",
                                              user: process.env.EMAIL,
                                              clientId: process.env.CLIENT_ID,
                                              clientSecret: process.env.CLIENT_SECRET,
                                              refreshToken: process.env.REFRESH_TOKEN,
                                              accessToken: accessToken,
                                            },
                                        });

                                        // send mail with defined transport object
                                        const mailOptions = {
                                            from: `"${process.env.SENDER_NAME}" <${process.env.EMAIL}>`, // sender address
                                            to: claimedSoftware?.userId?.email, // list of receivers
                                            subject: "Subscription Access", // Subject line
                                            html: data, // html body
                                        };

                                        transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                            console.log(error);
                                            } else {
                                                console.log("Mail sent : %s", info.response);

                                                claimedSoftware.hostedLink = hosted_page?.url;
                                                claimedSoftware.subscriptionExpiry = expirationTimestamp;
                                                claimedSoftware.save();

                                                return res.status(200).json({
                                                    success: true,
                                                    data: hosted_page?.url
                                                })
                                            }
                                        });
                                    }
                            });
                        }
                      });
                }
            });

        } else {
            return next(new ErrorResponse('Something Went Wrong', 400))

        }

        }
        catch (err) {
            return next(new ErrorResponse(err, 400))
        }
} 

exports.getSingleUserClaimedSoftwares = async (req, res, next) => {
    try {

        const softwares = await ClaimedSoftware.find({ userId: mongoose.Types.ObjectId(req.user.data[1])})
            .populate('softwareId')
            .populate('userId');
        
        if (!softwares) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No softwares found'
            })
        }

        console.log(softwares, 'software')

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

// exports.getWidgetImage = async (req, res, next) => {
//     try {
//         // Retrieve the claimed software data
//         const id = req.query.sId;
//         const claimedSoftware = await ClaimedSoftware.findOne({ softwareId: mongoose.Types.ObjectId(id) })
//             .populate('softwareId userId');

//         if (!claimedSoftware) {
//             return res.status(404).json({ message: 'Claimed software not found' });
//         }

//         // Create a canvas to draw the SVG
//         const canvasWidth = 200; // Adjust the width as needed
//         const canvasHeight = 54; // Adjust the height as needed
//         const canvas = createCanvas(canvasWidth, canvasHeight);
//         const ctx = canvas.getContext('2d');

//         // Background
//         ctx.fillStyle = '#f0f0f0';
//         ctx.fillRect(0, 0, canvasWidth, canvasHeight);

//         // Load the image
//         // const image = await loadImage(process.env.LIVE_SERVER_URL + claimedSoftware?.softwareId.softwareLogo);

//         // Draw the image
//         ctx.drawImage(process.env.LIVE_SERVER_URL + claimedSoftware?.softwareId.softwareLogo, 0, 0, 54, 54); // Adjust the dimensions as needed

//         // Text
//         ctx.fillStyle = '#000';
//         ctx.font = '14px Arial';
//         ctx.fillText(claimedSoftware?.softwareId.softwareName, 60, 30); // Adjust the coordinates as needed

//         // Star rating
//         const starRating = new StarRating(ctx, claimedSoftware?.softwareId.averageRating);
//         starRating.draw(100, 20); // Adjust the coordinates as needed

//         // Set the Content-Type header to indicate SVG
//         res.setHeader('Content-Type', 'image/svg+xml');

//         // Convert the canvas to an SVG and send it as a response
//         const svg = canvas.toBuffer().toString('utf8');
//         return res.status(200).send(svg);
//     } catch (err) {
//         return next(new ErrorResponse(err, 400))
//     }
// }


exports.getWidgetImage = async (req, res, next) => {
    try {
        // Retrieve the claimed software data
        const id = req.query.sId;
        const claimedSoftware = await ClaimedSoftware.findOne({ softwareId: mongoose.Types.ObjectId(id) })
            .populate('softwareId userId');

        if (!claimedSoftware) {
            return res.status(404).json({ message: 'Claimed software not found' });
        }

        // Define data to pass to the template
        const data = {
            imageUrl: process.env.LIVE_SERVER_URL + claimedSoftware?.softwareId.softwareLogo,
            softwareName: claimedSoftware?.softwareId.softwareName,
            starRatingSvg: StarRating({rating: claimedSoftware?.softwareId.averageRating}),
        };

        // Render the EJS template with the data
        ejs.renderFile(__dirname + '/../views/SVG.ejs', data , (err, str) => {
            if (err) {
                return next(new ErrorResponse(err, 400));
            }

            // Set the Content-Type header to indicate SVG
            res.setHeader('Content-Type', 'image/svg+xml');

            // Send the rendered SVG widget as a response
            return res.status(200).send(str);
        });
    } catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}



// Helper function to generate rating stars based on the average rating
const StarRating = ({ rating }) => {
    const starsTotal = 5; // Total number of stars
    const fullStars = Math.floor(rating); // Get the integer part of the rating
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

    let starsHTML = '';

    for (let i = 1; i <= starsTotal; i++) {
        if (i <= fullStars) {
            starsHTML += '<i key="' + i + '" class="icon_star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i key="' + i + '" class="icon_star-half"></i>';
        } else {
            starsHTML += '<i key="' + i + '" class="icon_star empty"></i>';
        }
    }

    return starsHTML;
};


// // Define the StarRating component
// function StarRating({ rating }) {
//     const starsTotal = 5; // Total number of stars
//     const fullStars = Math.floor(rating); // Get the integer part of the rating
//     const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

//     const renderStars = () => {
//         const stars = [];
//         for (let i = 1; i <= starsTotal; i++) {
//             if (i <= fullStars) {
//                 // Add a filled star polygon
//                 stars.push(
//                     `<polygon key=${i} points="${
//                         30 * (i - 1)
//                     },0 ${30 * i},0 ${30 * i + 2},6 ${30 * i + 4},0 ${
//                         30 * (i - 1) + 14
//                     },0 ${30 * (i - 1) + 6},8 ${30 * (i - 1) + 10},12 ${
//                         30 * i - 2
//                     },10 ${30 * i - 10},12 ${30 * i - 6},8" fill="#ffcc00" />`
//                 );
//             } else if (i === fullStars + 1 && hasHalfStar) {
//                 // Add a half-filled star polygon
//                 stars.push(
//                     `<polygon key=${i} points="${
//                         30 * (i - 1)
//                     },0 ${30 * i},0 ${30 * i + 2},6 ${30 * i + 1},7 ${
//                         30 * (i - 1) + 13
//                     },7 ${30 * (i - 1) + 6},8 ${30 * (i - 1) + 10},12 ${
//                         30 * i - 2
//                     },10 ${30 * i - 10},12 ${30 * i - 6},8" fill="#ffcc00" />`
//                 );
//             } else {
//                 // Add an empty star polygon
//                 stars.push(
//                     `<polygon key=${i} points="${
//                         30 * (i - 1)
//                     },0 ${30 * i},0 ${30 * i + 2},6 ${30 * i + 4},0 ${
//                         30 * (i - 1) + 14
//                     },0 ${30 * (i - 1) + 6},8 ${30 * (i - 1) + 10},12 ${
//                         30 * i - 2
//                     },10 ${30 * i - 10},12 ${30 * i - 6},8" fill="#fff" />`
//                 );
//             }
//         }
//         return stars.join(''); // Join the SVG polygons
//     };

//     // Return the HTML string without escaping
//     return renderStars();
// }
  

// exports.webhookCreated = async (req, res, next) => {
//     try {

//         // Handle the webhook event here
//         const event = req.body;
//         console.log('Received webhook event:', event);

//         // Extract relevant information, including the softwareId from event data
//         const subscriptionId = event.content.subscription.id;

//         console.log(subscriptionId, 'subscriptionId')


//         chargebee.subscription.retrieve(subscriptionId).request(function (error, result) {
//             if (error) {
//               // Handle error
//               console.log(error);
//             } else {
//                 console.log(result, 'SUBSCRIPTION RESULT')
//               const subscription = result?.subscription;
//                 const metadata = subscription?.meta_data; // This will contain the softwareId
//                 console.log(subscription, 'metadata')
//               // Access the softwareId
//               const softwareId = metadata?.softwareId;
              
//               // Now, you can associate the softwareId with the subscription as needed.
//             }
//           });
//         }
//         catch (err) {
//             return next(new ErrorResponse(err, 400))
//         }
// } 



exports.getHostedURLData = async (req, res, next) => {
    try {
        const hosted_id = req.query.hostedId;
        chargebee.hosted_page.retrieve(hosted_id).request(async (error,result) => {
            if(error){
              //handle error
              console.log(error);
            }else{
                //   console.log(result.hosted_page);
                var subscriptionId = result?.hosted_page?.content?.subscription?.id;
                const softwareId = result?.hosted_page?.pass_thru_content;
                console.log(softwareId, 'softwareId')

                const updatedProduct = await ClaimedSoftware.updateOne({softwareId : mongoose.Types.ObjectId(softwareId)},
                    {
                      subscriptionId: subscriptionId,
                      claimed: 1,
                    },
                    { new: true } // This option returns the updated document
                  );
                  
                  if (updatedProduct.nModified !== 1) {
                    return res.status(200).json({
                      data: null,
                      message: 'Update failed or document not found',
                      success: false,
                    });
                  }
                  
                  return res.status(200).json({
                    success: true,
                    data: updatedProduct, // Return the updated document
                    message: 'Software Updated Successfully',
                  });
            }
          });
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}