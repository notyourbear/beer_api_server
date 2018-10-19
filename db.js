const mongoose = require("mongoose");
const appConfig = require("./config");
mongoose.Promise = global.Promise;

module.exports = (config = appConfig) => {
  return mongoose.connect(
    config.db.url,
    { useNewUrlParser: true }
  );
};
