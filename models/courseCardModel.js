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
  id: {
    type: Number,
    default: 0,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

courseCardModel.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const highestId = await this.constructor
        .findOne()
        .sort({ id: -1 })
        .select("id");
      this.id = highestId ? highestId.id + 1 : 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

courseCardModel.pre("remove", async function (next) {
  try {
    const document = await this.constructor
      .findOne({ _id: this._id })
      .select("id");

    if (document) {
      await this.constructor.updateMany(
        { id: { $gt: document.id } },
        { $inc: { id: -1 } }
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("courseCardModel", courseCardModel);
