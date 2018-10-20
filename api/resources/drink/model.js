const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "a drink must have a user associated"]
    },
    beer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "beer",
      required: [true, "a drink must have a user associated"]
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: [true, "a drink must have a location associated"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("drink", drinkSchema);
