const express = require("express");
const router = express.Router();
const {
  submitResponse,
  sendContactMail,
  getAllContactMails,
  deleteContactMail
} = require("../controllers/contactmails.controllers");

router.post('/submitresponse', submitResponse);
router.post('/sendcontactmail', sendContactMail);
router.get('/getAllContactMails', getAllContactMails);
router.delete('/deleteContactMail', deleteContactMail);

module.exports = router;
