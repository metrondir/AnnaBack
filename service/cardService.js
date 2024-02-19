const asyncHandler = require("express-async-handler");

const CourseCardModel = require("../models/courseCardModel");
const PriceCardModel = require("../models/priceCardModel");
const imgur = require("imgur");

//const client = new ImgurClient({
//  clientId: process.env.IMGUR_CLIENT_ID,
//  clientSecret: process.env.IMGUR_CLIENT_SECRET,
//});

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
module.exports = {
  getPriceCards,
  getCourseCards,
  createCourseCard,
  createPriceCard,
};
