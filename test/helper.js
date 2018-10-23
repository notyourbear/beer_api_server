const mongoose = require("mongoose");
const config = require("../config");

const userModel = require("../api/resources/user/model");
const locationModel = require("../api/resources/location/model");
const drinkModel = require("../api/resources/drink/model");
const beerModel = require("../api/resources/beer/model");

mongoose.Promise = global.Promise;

module.exports = {
  dropDb,
  removeModel
};

function dropDb() {
  return mongoose
    .connect(
      config.db.url,
      { useNewUrlParser: true }
    )
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
}

function removeModel(modelName) {
  let model;
  switch (modelName) {
    case "user":
      model = userModel;
      break;
    case "beer":
      model = beerModel;
      break;
    case "location":
      model = locationModel;
      break;
    case "drink":
      model = drinkModel;
      break;
  }

  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    model.remove(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
