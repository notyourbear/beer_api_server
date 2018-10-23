const createApiSpec = require("../../../test/apiSpec");
const BeerModel = require("./model");

createApiSpec(BeerModel, "beer", {
  name: "Champagne Hopi",
  brewery: "Alvarado Street",
  type: "Brut IPA"
});
