const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
