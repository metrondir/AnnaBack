const asyncHandler = require("express-async-handler");
const imgur = require("imgur");
const CourseCardModel = require("../models/courseCardModel");
const PriceCardModel = require("../models/priceCardModel");
const getCourseCards = asyncHandler(async (req, res, next) => {
  const CourseCard = await CourseCardModel.find();
  return CourseCard;
});
const getPriceCards = asyncHandler(async (req, res, next) => {
  const PriceCards = await PriceCardModel.find();
  return PriceCards;
});
const createCourseCard = asyncHandler(async (req, res, next) => {
  const imgurLink = await imgur.uploadFile(req.file.path);

  try {
    let CourseCard = req.body;
    CourseCard.image = imgurLink;
    CourseCard = new CourseCardModel(CourseCard);
    await CourseCard.save();
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});
const createPriceCard = asyncHandler(async (req, res, next) => {
  const imgurLink = await imgur.uploadFile(req.file.path);
  try {
    let PriceCard = req.body;
    PriceCard.image = imgurLink;
    PriceCard = new PriceCardModel(PriceCard);
    await PriceCard.save();
    return PriceCard;
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getPriceCards,
  getCourseCards,
  createCourseCard,
  createPriceCard,
};
