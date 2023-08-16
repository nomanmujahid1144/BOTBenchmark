const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const { uploadImage } = require('../helpers/helpers')
const { sendEmail } = require('../helpers/SendEmail')
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const firebase = require('firebase');
var berbix = require("berbix");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API);



const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const JWT_RESET_KEY = process.env.JWT_RESET_KEY;
let client = new berbix.Client({
  apiSecret: "secret_test_hEZ5sPaWiHDPQKyv81NXMrcxXtBPBv1W",
});

exports.userSignup = async (req, res, next) => {
  console.log(req.body, "signup request");
  console.log(req.files);

  let body = req.body;
  try {
    let userInfo = await User.findOne({ email: req.body.email });
    console.log(userInfo, 'userInfo')
    if (userInfo) {
      return res.status(200).json({
        success: true,
        message: "Account with this email already exixts",
        data: userInfo
      })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      if (req.files) {
        const profilePhotoUploaded = await uploadImage(
          req.files.profilePhoto,
          next
        );
        body.profilePhoto = profilePhotoUploaded.photoPath;
      }
  
  
      let user = await new User({
        email: body.email,
        password: hash,
        profilePhoto: body.profilePhoto,
        fullName: body.fullName
      });
      const token = jsonwebtoken.sign(
        {
          data: [user.email, user._id],
          role: "user",
        },
        "" + process.env.JWT_SECRET
      );
  
      const result = await user.save();
  
      return res.status(200).json({
        success: true,
        message: "Create Account Successfully",
        data: result,
        token,
      })
    }

  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.userLogin = async (req, res, next) => {
  console.log(req.query, "query");
  console.log(req.body, "Login request");
  // console.log(req.body)
  try {
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      // this means result is null
      return next(new ErrorResponse("Incorrect email address", 401));
    } else {
      // email did exist
      // so lets match password
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // great, allow this user access
        const token = jsonwebtoken.sign(
          {
            data: [result.email, result._id],
            role: "user",
          },
          "" + process.env.JWT_SECRET
        );
        console.log(result, ":usersssssss")
        return res.status(200).json({
          success: true,
          message: "Logged In Successfully",
          data: {
            token,
            result,

          },
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Incorrect Password",
          data: null,
        });
      }
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.userSocialSignup = async (req, res, next) => {
  console.log(req.body, "signup social user request");
  try {
    const oldUser = await User.findOne({ email: req.body.email })
    if (oldUser) {
      console.log(oldUser, 'oldUser')
      const token = jsonwebtoken.sign(
        {
          data: [oldUser.email, oldUser._id],
          role: "user",
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        data: { token, "result": oldUser },
      });
    }
    let user = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      profilePhoto: req.body.profilePhoto,
      fcmToken: req.body.fcmToken

    });

    const token = jsonwebtoken.sign(
      {
        data: [user.email, user._id],
        role: "user",
      },
      "" + process.env.JWT_SECRET
    );

    const result = await user.save();

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Create Account Successfully",
        data: { token, "result": oldUser},
      });
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Sign up failed",
        data: null,
      });
    }


  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.addUserNumber = async (req, res, next) => {
  console.log(req.body.PhoneNumber, "add user number");
  try {
    // console.log(req.user.data[1]);
    const userId = req.user.data[1];
    console.log(userId, "userID");
    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      { phoneNumber: req.body.PhoneNumber.toString() }
    );
    if (!updatedUser) {
      return res.status("Number Update Failed", 400);
    }
    console.log(updatedUser)
    return res.status(200).json({
      success: true,
      message: "Phone Number Added Successfully",
      data: updatedUser,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getSingleUser = async (req, res, next) => {
  console.log(req.user.data[1], "users id");
  try {
    let user = await User.findOne({
      _id: mongoose.Types.ObjectId(req.user.data[1]),
    });
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

exports.getAllUsers = async (req, res, next) => {
  try {
    let user = await User.find({});
    if (user) {
      return res.status(200).json({
        success: true,
        message: "users found",
        data: user,
      });
    }
    return res.status(200).json({
      success: true,
      message: "No User found",
      data: user,
    });

  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};



exports.checkUserMail = async (req, res, next) => {
  try {
    let userEmail = await User.findOne({ email: req.query.email });
    if (!userEmail) {
      return res.status(200).json({
        success: false,
        message: "This user does not exist ",
        data: null,
      });
    }
    const otp = Math.floor(Math.random() * 90000) + 10000;
    const msg = {
      to: `${userEmail.email}`,
      from: process.env.EMAIL, // Change to your verified sender
      subject: "Security Check",
      text: `${otp}`,
      html: `<strong>Enter this code in application : ${otp}</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return res.status(200).json({
          success: true,
          message: "Security code has been sent to your email account",
          data: otp,
        });
      })
      .then((e) => console.log(e, "in sending error"));
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.forgetPassword = async (req, res, next) => {
  console.log(req.body, 'req.body')
  try {

    const email = req.body.email;
    const user = await User.findOne({ 'email': email })
    console.log(user, 'user')
    const userId = user.id;
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Not Send ",
        data: null,
      });
    } else {
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID, // ClientID
        process.env.CLIENT_SECRET, // Client Secret
        process.env.REDIRECT_URL // Redirect URL
      );
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
      const accessToken = oauth2Client.getAccessToken();
      const token = jsonwebtoken.sign({ _id: userId }, JWT_RESET_KEY, {
        expiresIn: "30m",
      });


      const CLIENT_URL = process.env.LIVE_URL; // Live
      const currentYear = new Date().getFullYear();

      const output = `
                  <div style="margin-top: 50px;">
                        <table cellpadding="0" cellspacing="0" style="font-family: Nunito, sans-serif; font-size: 15px; font-weight: 400; max-width: 600px; border: none; margin: 0 auto; border-radius: 6px; overflow: hidden; background-color: #fff; box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);">
                            <thead>
                                <tr style="background-color: #00BF63; padding: 3px 0; line-height: 68px; text-align: center; color: #fff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                                    <th scope="col"><img src="${CLIENT_URL}/logo-light.png" alt=""></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style="padding: 48px 24px 0; color: #161c2d; font-size: 18px; font-weight: 600;">
                                        Hello, ${user?.fullName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 24px 15px; color: #8492a6;">
                                        To reset your password, please click the button below :
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 15px 24px;">
                                        <a href="${CLIENT_URL}/confirm-password/${token}" style="padding: 8px 20px; outline: none; text-decoration: none; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s; font-weight: 600; border-radius: 6px; background-color: #4f46e5; border: 1px solid #4f46e5; color: #ffffff;">Reset Password</a>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 15px 24px 0; color: #8492a6;">
                                        This link will be active for 30 minutes from the time this email was sent. If you did not request to reset your password, please ignore this email and your account will not be affected.
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 15px 24px 15px; color: #8492a6;">
                                      BOT Benchmark <br> Support Team
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 16px 8px; color: #8492a6; background-color: #f8f9fc; text-align: center;">
                                        © ${currentYear} BOT Benchmark.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;

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
        to: email, // list of receivers
        subject: "Account Password Reset:  ✔", // Subject line
        html: output, // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Mail sent : %s", info.response);
        }
      });

      return res.status(200).json({
        success: true,
        message: "Email Send to your Account.",
        data: null,
      });
    }

  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
exports.VerifyJWTToken = async (req, res, next) => {
  console.log(req.body, 'req.body')
  try {
    const token = req.body.token
    jsonwebtoken.verify(token, JWT_RESET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Session Expired",
          data: null,
        });
      } else {
        const { _id } = decodedToken;
        
        return res.status(200).json({
          success: true,
          message: "User Found",
          data: _id,
        });
      }
    });

  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.updateUserPassword = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)
    let userEmail = await User.updateOne(
      { _id: req.body.id },
      { password: hash }
    );
    if (userEmail.nModified < 1) {
      return res.status(200).json({
        success: false,
        message: "Password Update Failed",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
      data: null,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.idVerification = async (req, res, next) => {

  console.log(req.user.data[1] + " Id Verification User");
  console.log(req.body)
  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.user.data[1]) }).select("_id");
    console.log(user + " Verified User ID");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesnt exists",
        data: null
      });
    }
    console.log(user + "Berbix User Found")
    let transactionTokens = await client.createTransaction({
      customerUid: user._id, // ID for the user in internal database
      // templateKey: req.body.type == 'web' ? "" + process.env.BERBIX_TEMPLETE_KEY_WEB : "" +process.env.BERBIX_TEMPLETE_KEY_MOBILE // Template key for this transaction
      templateKey: "tpk_m9QUQ9kt0QxVTYXWaUG6NI8xZefcLxVj" // Template key for this transaction
    });
    console.log(transactionTokens.clientToken + " Client tokens")
    const updatedDriver = await User.updateOne(
      { _id: req.user.data[1] },
      { accessToken: transactionTokens.accessToken, refreshToken: transactionTokens.refreshToken }
    );
    if (updatedDriver.nModified != 0) {
      return res.status(200).json({
        success: true,
        message: "Tokens",
        data: transactionTokens,
      });
    }
    return res.status(200).json({
      success: false,
      message: "cannot verify at this time",
      data: null,
    });

  } catch (err) {
    console.log("Error Section")
    console.log(err)
    return next(new ErrorResponse(err, 400));
  }
};


exports.afterVerification = async (req, res) => {
  console.log(req.body.customer_uid + " After Verification")
  const driver = await User.findOne({ _id: req.body.customer_uid }, { refreshToken: 1 })
  console.log(driver)
  var transactionTokens = berbix.Tokens.fromRefresh(driver.refreshToken)
  var transactionData = await client.fetchTransaction(transactionTokens)
  console.log(transactionData, " :transaction data")
  if (transactionData?.fields?.date_of_birth) {
    let dob = transactionData.fields.date_of_birth.value
    let newStr = dob.split('-', 3)
    let revDob = `${newStr[2]}-${newStr[1]}-${newStr[0]}`

    let today = new Date()
    var datesplit = revDob.split('-');
    var year = datesplit[2]
    var month = datesplit[1]
    var day = datesplit[0]
    var age = today.getFullYear() - year;
    console.log(age, "age")
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    if (age >= 21) {
      const updatedUser = await User.findOneAndUpdate({ _id: transactionData.customer_uid }, { age: age, ageVerification: true })
    }
    else {
      const updatedUser = await User.findOneAndUpdate({ _id: transactionData.customer_uid }, { age: age, ageVerification: false })
    }

    return
  }
}

exports.updateUser = async (req, res, next) => {
  console.log(req.body, "update user");
  try {

    const userId = req.user.data[1];

    let body = req.body

    if (req.files) {
      const profilePhotoUploaded = await uploadImage(req.files.profilePhoto, next)
      body.profilePhoto = profilePhotoUploaded.photoPath
      console.log(body, " :new body")
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      req.body
      ,
      { new: true }
    );
    if (!updatedUser) {
      return res.status("User Update Failed", 400);
    }




    console.log(updatedUser)
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.updateUserStatus = async (req, res, next) => {
  console.log(req.body, 'body')
  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.query.id) },
      req.body,
      { new: true }
    );
    console.log(user);

    if (!user) {
      return res.status(200).json({
        data: null,
        message: "update failed",
        success: false,
      });
    }
    let output = '';

    if (user.verified == true) {
      output = `
        <h3>Your account has been approved .</h3>
        <h3>You can start ordering</h3>
      `;
    }

    await sendEmail(output, user.email, 'Account Info', next)

    return res.status(200).json({
      data: user,
      message: "Updated successfully",
      success: true,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};


exports.disableAccount = async (req, res, next) => {
  console.log(req.body, "order Body")
  const email = req.body.email
  const name = req.body.name

  try {
    const user = await User.findOneAndUpdate({ 'email': email }, { deactivate: 1 })

    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, // ClientID
      process.env.CLIENT_SECRET, // Client Secret
      process.env.REDIRECT_URL // Redirect URL
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();


    const output = `
            <h2>Account Deletion Request</h2>
            <p><b>NOTE: </b>${name} with ${email} has requested to deactivate his account kindly deactivate his account from Admin Panel.</p>
            `;

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
      to: process.env.EMAIL, // list of receivers
      subject: "Account Deletion Request:  ✔", // Subject line
      html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail sent : %s", info.response);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Email Send to your Account.",
      data: null,
    });

  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getDeactivateAccount = async (req, res, next) => {
  try {
    const user = await User.find({
      $or: [
        { deactivate: 1 },
        { deactivate: 2 }
      ]
    })

    if (user.length != 0) {
      return res.status(200).json({
        success: true,
        message: "Found All Deactivated Users.",
        data: user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No User Found",
        data: [],
      });
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
exports.deactivateaccount = async (req, res, next) => {
  console.log(req.body, 'body')
  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.query.id) },
      req.body,
      { new: true }
    );
    console.log(user);

    if (!user) {
      return res.status(200).json({
        data: null,
        message: "update failed",
        success: false,
      });
    }
    let output = '';

    if (user.deactivate == 2) {
      output = `
        <h3>Your account has been Deactivated by Admin.</h3>
        <h3>Feel free to contact Admin by more details</h3>
      `;
    } else if (user.deactivate == 1) {
      output = `
        <h3>Congratulations!!!<h3/>
        <h2>Your account has been Activated.</h2>
        <h2>Now you can start ordering.</h2>
      `;
    }

    await sendEmail(output, user.email, 'Account Info', next)

    return res.status(200).json({
      data: user,
      message: "Updated successfully",
      success: true,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};



