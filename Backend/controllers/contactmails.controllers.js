const ErrorResponse = require("../utils/errorResponse");
const ContactMail = require("../models/ContactMails");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API);



const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.submitResponse = async (req, res, next) => {
    console.log(req.body, "order Body")
    const id = req.body.id;
    const yourmessage = req.body.yourmessage;
  
    try {
  
        const contact = await ContactMail.findOne({ _id: mongoose.Types.ObjectId(id)});

        console.log(contact)

        if (!contact) {
            
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
    
            const currentYear = new Date().getFullYear();
            const output = `
                        <div style="margin-top: 50px;">
                            <table cellpadding="0" cellspacing="0" style="font-family: Nunito, sans-serif; font-size: 15px; font-weight: 400; max-width: 600px; border: none; margin: 0 auto; border-radius: 6px; overflow: hidden; background-color: #fff; box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);">
                                <thead>
                                    <tr style="background-color: #00BF63; width: 100% ;padding: 3px 3px; line-height: 68px; text-align: center; color: #fff; font-size: 14px; font-weight: 700; letter-spacing: 1px;">
                                        <th scope="col">Message from Admin</th>
                                    </tr>
                                </thead>
    
                                <tbody>
                                    <tr>
                                        <td style="padding: 15px 24px 0; color: #8492a6;">
                                            <span>Your Message</span>
                                            <br />
                                            ${contact?.message}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 15px 24px 0; color: #8492a6;">
                                            <span>Admin Response</span>
                                            <br />
                                            ${yourmessage}
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
                to: contact?.emailId, // list of receivers
                subject: "Response From BOTBenchmark ✔", // Subject line
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

exports.sendContactMail = async (req, res, next) => {
    console.log(req.body, "order Body")
    const userName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.emailId;
    const message = req.body.message;
  
    try {
  
        const contact = new ContactMail({
            emailId : req.body.emailId, 
            message : req.body.message, 
            phoneNumber : req.body.phoneNumber, 
            fullName : req.body.fullName, 
        })

        await contact.save();

        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID, // ClientID
            process.env.CLIENT_SECRET, // Client Secret
            process.env.REDIRECT_URL // Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = oauth2Client.getAccessToken();

        const currentYear = new Date().getFullYear();
        const output = `
                    <div style="margin-top: 50px;">
                        <table cellpadding="0" cellspacing="0" style="font-family: Nunito, sans-serif; font-size: 15px; font-weight: 400; max-width: 600px; border: none; margin: 0 auto; border-radius: 6px; overflow: hidden; background-color: #fff; box-shadow: 0 0 3px rgba(60, 72, 88, 0.15);">
                            <thead>
                                <tr style="background-color: #00BF63; padding: 3px 3px; line-height: 68px; text-align: center; color: #fff; font-size: 14px; font-weight: 700; letter-spacing: 1px;">
                                    <th scope="col">Message from, ${userName} with this email: <span style="color: #fff">${email}</span></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style="padding: 15px 24px 0; color: #8492a6;">
                                        ${message}
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
            to: process.env.EMAIL, // list of receivers
            subject: "Contact Us Form ✔", // Subject line
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


exports.getAllContactMails = async (req, res, next) => {
    try {
        const mails = await ContactMail.find({})
        if (mails.length <= 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No mail found'
            })
        }
        return res.status(200).json({
            success: true,
            data: mails,
            message: "Mails found"
        })
    }
    catch (err) {
        return next(new ErrorResponse(err, 400))
    }
}

exports.deleteContactMail = async (req, res, next) => {
    try {
        let deletedCount = 0
        Promise.all(req.query.IDS.map(async (element) => {

            const deletedContactMail = await ContactMail.deleteOne({ _id: mongoose.Types.ObjectId(element) })
            if (deletedContactMail.n >= 1) {
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