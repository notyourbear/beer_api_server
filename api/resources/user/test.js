const createApiSpec = require("../../../test/apiSpec");
const UserModel = require("./model");

createApiSpec(UserModel, "user", { name: "maxime" });
