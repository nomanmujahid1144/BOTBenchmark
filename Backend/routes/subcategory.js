const express = require("express");

const {
  addSubCategory,
  getAllSubCategories,
  deleteSubCategories,
  updateSubCategory,
} = require("../controllers/subCategory.controllers");
const router = express.Router();


router.post("/addsubcategory",  addSubCategory);
router.get("/getsubcategories", getAllSubCategories);
router.delete("/deletesubcategories", deleteSubCategories);
router.patch("/updatesubcategory", updateSubCategory);

module.exports = router;
