const express = require("express");
const router = express.Router();

const {
  getCourseCards,
  getPriceCards,
  createCourseCard,
  createPriceCard,
  deleteCourseCard,
  deletePriceCard,
  updateCourseCard,
  updatePriceCard,
  getNumberOfPriceCards,
  getNumberOfCourseCards,
} = require("../controllers/cardController");

router.route("/course").get(getCourseCards).post(createCourseCard);
router.route("/courseNumber").get(getNumberOfCourseCards);
router.route("/priceNumber").get(getNumberOfPriceCards);
router.route("/price").get(getPriceCards).post(createPriceCard);

router.route("/course/:id").delete(deleteCourseCard).put(updateCourseCard);
router.route("/price/:id").delete(deletePriceCard).put(updatePriceCard);
module.exports = router;
