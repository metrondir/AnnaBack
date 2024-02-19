const mongoose = require("mongoose");

const courseCardModel = new mongoose.Schema({
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

module.exports = mongoose.model("courseCardModel", courseCardModel);
