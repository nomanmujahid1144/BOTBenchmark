const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  userSocialSignup,
  idVerification,
  addUserNumber,
  forgetPassword,
  VerifyJWTToken,
  getSingleUser,
  checkUserMail,
  updateUserPassword,
  changeUserPassword,
  updateUser,
  updateUserStatus,
  afterVerification,
  getAllUsers,
  disableAccount,
  getDeactivateAccount,
  deactivateaccount,
} = require("../controllers/user.controllers");

const checkAuth = require("../middleware/check-auth");

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.patch("/forgetpassword", forgetPassword);
router.patch("/verifyjwttoken", VerifyJWTToken);
router.patch("/updatepassword", updateUserPassword);
router.patch("/changeUserPassword", checkAuth, changeUserPassword);

router.post("/usersocialsignup", userSocialSignup);
router.patch("/addusernumber", checkAuth, addUserNumber);
router.patch("/updateuser", checkAuth, updateUser);
router.patch("/updateuserstatus",  updateUserStatus);

router.post("/idverification" , checkAuth  , idVerification);



router.patch("/disableaccount", checkAuth ,  disableAccount);
router.get("/getdeactivateaccount", checkAuth ,  getDeactivateAccount);
router.patch("/deactivateaccount",   deactivateaccount);

router.get("/checkemail", checkUserMail);
router.get("/getsingleuser", checkAuth, getSingleUser);
router.get("/getallusers", checkAuth ,getAllUsers);
router.post('/afterverification' , afterVerification)


module.exports = router;
