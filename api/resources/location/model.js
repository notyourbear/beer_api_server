const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a location must have a name"],
    lowercase: true
  }
});

module.exports = mongoose.model("location", locationSchema);
