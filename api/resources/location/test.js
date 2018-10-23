const createApiSpec = require("../../../test/apiSpec");
const LocationModel = require("./model");

createApiSpec(LocationModel, "location", { name: "hog's" });
