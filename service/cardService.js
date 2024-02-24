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
    const numericId = Number(id);
    const deletedCourseCard = await CourseCardModel.findOneAndDelete({
      id: numericId,
    });
    const cards = await CourseCardModel.updateMany(
      { id: { $gt: numericId } },
      { $inc: { id: -1 } }
    );
    return deletedCourseCard;
  } catch (error) {
    throw new Error(error);
  }
});

const deletePriceCard = asyncHandler(async (id) => {
  try {
    const numericId = Number(id);
    const deletedPriceCard = await PriceCardModel.findOneAndDelete({
      id: numericId,
    });
    const cards = await PriceCardModel.updateMany(
      { id: { $gt: numericId } },
      { $inc: { id: -1 } }
    );
    return deletedPriceCard;
  } catch (error) {
    throw new Error(error);
  }
});

const updateCourseCard = asyncHandler(async (req, res, next) => {
  try {
    if (req.file && req.file.path) {
      const imgurLink = await imgur.uploadFile(req.file.path);
      req.body.image = imgurLink.link;
    }

    const numericId = Number(req.params.id);
    const existingCourseCard = await CourseCardModel.findOne({ id: numericId });

    // Update only non-empty and non-whitespace fields
    for (const key in req.body) {
      if (req.body[key] !== "" && req.body[key].trim() !== "") {
        existingCourseCard[key] = req.body[key];
      }
    }

    const updatedCourseCard = await existingCourseCard.save();

    if (!updatedCourseCard) {
      return res.status(404).json({ message: "Course card not found" });
    }

    res.status(200).json(updatedCourseCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updatePriceCard = asyncHandler(async (req, res, next) => {
  try {
    if (req.file && req.file.path) {
      const imgurLink = await imgur.uploadFile(req.file.path);
      req.body.image = imgurLink.link;
    }

    const numericId = Number(req.params.id);

    const existingCourseCard = await PriceCardModel.findOne({ id: numericId });

    // Update only non-empty and non-whitespace fields
    for (const key in req.body) {
      if (req.body[key] !== "" && req.body[key].trim() !== "") {
        existingCourseCard[key] = req.body[key];
      }
    }

    // Save the updated document
    const updatedPriceCard = await existingCourseCard.save();

    if (!updatedPriceCard) {
      return res.status(404).json({ message: "Price card not found" });
    }

    res.status(200).json(updatedPriceCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
