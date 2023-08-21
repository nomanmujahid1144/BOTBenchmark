const express = require("express");
const multer = require("multer");
const path            = require('path');
const fs            = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Software');

const {
  addSoftware,
  getAllSoftwares,
  getFilteredSoftwares,
  getSingleSoftware,
  deleteSoftwares,
  updateSoftware,
  addDescriptionImage,
  CreateCheckoutForNewSubscription,
  // RetrieveHostedPage,
  uploadImage,
  getdiscountproducts,
  getFeatureProducts,
  getProductByBrand,
  getProductByBrandWithCategory,
  getAllProductsClientSide,

  addToFavourite,
  getAllFavourites,
  getSearchSoftwares,
} = require("../controllers/software.controllers");
const router = express.Router();

router.post("/addsoftware",  addSoftware);
router.get("/getsoftwares", getAllSoftwares);
router.get("/getfilteredsoftwares", getFilteredSoftwares);
router.get("/getsearchsoftwares", getSearchSoftwares);
router.get("/getsinglesoftwares", getSingleSoftware);
router.delete("/deletesoftwares", deleteSoftwares);
router.patch("/updatesoftware", updateSoftware);
router.post("/adddescriptionimage", addDescriptionImage);

router.post("/createsubscription", CreateCheckoutForNewSubscription);
// router.get("/RetrieveHostedPage", RetrieveHostedPage);

router.get("/getdiscountproducts", getdiscountproducts);
router.get("/getfeatureproducts", getFeatureProducts);
router.get("/getproductbybrand", getProductByBrand);
router.get("/getproductbybrandwithcategory", getProductByBrandWithCategory);



router.get("/getproductsclient", getAllProductsClientSide);

router.patch("/addtofavourite" ,  addToFavourite);
router.get("/getallfavourites" ,  getAllFavourites);

module.exports = router;
