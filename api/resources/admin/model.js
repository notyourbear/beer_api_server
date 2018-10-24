const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user must have a name"],
      unique: true
    },
    passwordHash: {
      required: true,
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

adminSchema.methods.authenticate = (plainTextPassword, hash) => {
  return bcrypt.compareSync(plainTextPassword, hash);
};

adminSchema.statics.hashPassword = plainTextPassword => {
  if (!plainTextPassword) {
    throw new Error("Could not save user");
  }

  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPassword, salt);
};

module.exports = mongoose.model("admin", adminSchema);
