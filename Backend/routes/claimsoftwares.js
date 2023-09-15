const express = require("express");

const {
  addClaimedSoftwares,
  getAllClaimedSoftwares,
  CreateCheckoutForNewSubscription,
  // webhookCreated,
  getHostedURLData,
  getSingleUserClaimedSoftwares,
  getWidgetImage
} = require("../controllers/claimedSoftwares.controller");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/addclaimedsoftware",checkAuth,   addClaimedSoftwares);
router.get("/getclaimedsoftware", getAllClaimedSoftwares);
router.get("/getsingleuserclaimedsoftwares",checkAuth, getSingleUserClaimedSoftwares);
router.post("/createsubscription", CreateCheckoutForNewSubscription);
// router.post("/chargebee-webhook", webhookCreated);
router.get("/getHostedURLData", getHostedURLData);
router.get("/image-widget", getWidgetImage);

module.exports = router;
