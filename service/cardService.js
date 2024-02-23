const asyncHandler = require("express-async-handler");

const CourseCardModel = require("../models/courseCardModel");
const PriceCardModel = require("../models/priceCardModel");
const imgur = require("imgur");

const getCourseCards = asyncHandler(async () => {
  const CourseCard = await CourseCardModel.find();

  return CourseCard;
});
const getPriceCards = asyncHandler(async () => {
  const PriceCards = await PriceCardModel.find();

  return PriceCards;
});
const createCourseCard = asyncHandler(async (req, res, next) => {
  try {
    const imgurLink = await imgur.uploadFile(req.file.path);
    let CourseCard = req.body;
    CourseCard.image = imgurLink.link;
    CourseCard = new CourseCardModel(CourseCard);
    await CourseCard.save();
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});
const createPriceCard = asyncHandler(async (req, res, next) => {
  try {
    const imgurLink = await imgur.uploadFile(req.file.path);
    console.log(imgurLink);
    let PriceCard = req.body;
    PriceCard.image = imgurLink.link;
    PriceCard = new PriceCardModel(PriceCard);
    await PriceCard.save();
    return PriceCard;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const deleteCourseCard = asyncHandler(async (id) => {
  try {
    const CourseCard = await CourseCardModel.findByIdAndDelete(id);
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});

const deletePriceCard = asyncHandler(async (id) => {
  try {
    const CourseCard = await PriceCardModel.findByIdAndDelete(id);
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});

const updateCourseCard = asyncHandler(async (id, req) => {
  try {
    const CourseCard = await CourseCardModel.findByIdAndUpdate(id, req);
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});

const updatePriceCard = asyncHandler(async (id, req) => {
  try {
    const CourseCard = await PriceCardModel.findByIdAndUpdate(id, req);
    return CourseCard;
  } catch (error) {
    throw new Error(error);
  }
});

const getNumberOfCourseCards = asyncHandler(async () => {
  const CourseCards = await CourseCardModel.find();
  return CourseCards.length;
});

const getNumberOfPriceCards = asyncHandler(async () => {
  const CourseCards = await PriceCardModel.find();
  return CourseCards.length;
});

module.exports = {
  getPriceCards,
  getCourseCards,
  createCourseCard,
  createPriceCard,
  deleteCourseCard,
  deletePriceCard,
  updateCourseCard,
  updatePriceCard,
  getNumberOfCourseCards,
  getNumberOfPriceCards,
};
