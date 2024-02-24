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

const deleteCourseCard = asyncHandler(async (req, res, next) => {
  try {
    await cardService.deleteCourseCard(req.params.id);
    return res.status(200).json("Course Card deleted");
  } catch (error) {
    next(error);
  }
});
const deletePriceCard = asyncHandler(async (req, res, next) => {
  try {
    await cardService.deletePriceCard(req.params.id);
    return res.status(200).json("Course Card deleted");
  } catch (error) {
    next(error);
  }
});

const updateCourseCard = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    try {
      console.log(req.body);
      await cardService.updateCourseCard(req, res, next);
    } catch (error) {
      next(error);
    }
  }),
];

const updatePriceCard = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    try {
      await cardService.updatePriceCard(req, res, next);
    } catch (error) {
      next(error);
    }
  }),
];

const getNumberOfCourseCards = asyncHandler(async (req, res, next) => {
  try {
    const numberOfCourseCards = await cardService.getNumberOfCourseCards();
    return res.status(200).json(numberOfCourseCards);
  } catch (error) {
    next(error);
  }
});

const getNumberOfPriceCards = asyncHandler(async (req, res, next) => {
  try {
    const numberOfCourseCards = await cardService.getNumberOfPriceCards();
    return res.status(200).json(numberOfCourseCards);
  } catch (error) {
    next(error);
  }
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
