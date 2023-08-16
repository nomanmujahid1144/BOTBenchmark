const express = require("express");

const {
  addCategory,
  getAllCategories,
  getSingleBrand,
  deleteCategories,
  updateCategory,
  getAllProductsClientSide,
} = require("../controllers/category.controller");
const router = express.Router();


router.post("/addcategory",  addCategory);
router.get("/getcategories", getAllCategories);
router.delete("/deletecategories", deleteCategories);
router.patch("/updatecategory", updateCategory);


router.get("/getsinglebrand", getSingleBrand);
router.get("/getproductsclient", getAllProductsClientSide);

module.exports = router;
