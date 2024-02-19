const asyncHandler = require("express-async-handler");
const cardService = require("../service/cardService");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const getPriceCards = asyncHandler(async (req, res, next) => {
  try {
    const PriceCard = await cardService.getPriceCards();
    console.log(PriceCard);
    return res.status(200).json(PriceCard);
  } catch (error) {
    next(error);
  }
});
const getCourseCards = asyncHandler(async (req, res, next) => {
  try {
    const CourseCard = await cardService.getCourseCards();
    return res.status(200).json(CourseCard);
  } catch (error) {
    next(error);
  }
});
const createCourseCard = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    try {
      await cardService.createCourseCard(req);
      return res.status(201).json("Course Card created");
    } catch (error) {
      next(error);
    }
  }),
];
const createPriceCard = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    try {
      await cardService.createPriceCard(req);
      return res.status(201).json("Price Card created");
    } catch (error) {
      next(error);
    }
  }),
];
module.exports = {
  getPriceCards,
  getCourseCards,
  createCourseCard,
  createPriceCard,
};
