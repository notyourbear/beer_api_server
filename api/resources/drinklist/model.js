const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "a list must have a user associated"]
    },
    list: {
      type: [
        {
          beer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "beer"
          },
          location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "location"
          }
        }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("drinklist", listSchema);
