const express = require("express");
const router = express.Router();

const {
  getCourseCards,
  getPriceCards,
  createCourseCard,
  createPriceCard,
} = require("../controllers/cardController");
router.route("/course").get(getCourseCards).post(createCourseCard);
router.route("/price").get(getPriceCards).post(createPriceCard);

module.exports = router;
