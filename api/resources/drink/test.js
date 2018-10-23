const createApiSpec = require("../../../test/apiSpec");
const DrinkModel = require("./model");

createApiSpec(DrinkModel, "drink", {
  beer: {
    name: "Champagne Hopi",
    brewery: "Alvarado Street",
    type: "Brut IPA"
  },
  location: {
    name: "hog's"
  },
  user: {
    name: "Maxime"
  }
});
