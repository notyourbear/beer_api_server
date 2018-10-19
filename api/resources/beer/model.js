const mongoose = require("mongoose");

const beerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a beer must have a name associated with it"],
      lowercase: true
    },
    brewery: {
      type: String,
      required: [true, "a beer must have been brewed somewhere"],
      lowercase: true
    },
    type: {
      type: String,
      required: [true, "a beer must be a beer of some sort"],
      lowercase: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("beer", beerSchema);
