const mongoose = require("mongoose");

const galleryModel = new mongoose.Schema({
  info: {
    type: String,

    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("galleryModel", galleryModel);
