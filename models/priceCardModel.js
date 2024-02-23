const mongoose = require("mongoose");

const priceCardModel = new mongoose.Schema({
  info: {
    type: String,

    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
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

priceCardModel.pre("save", async function (next) {
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

priceCardModel.pre("remove", async function (next) {
  try {
    const document = await this.constructor
      .findOne({ _id: this._id })
      .select("id");
    await this.constructor.updateMany(
      { id: { $gt: document.id } },
      { $inc: { id: -1 } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("priceCardModel", priceCardModel);
