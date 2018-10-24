const createApiSpec = require("../../../test/apiSpec");
const AdminModel = require("./model");
const AdminController = require("./controller");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

createApiSpec(
  AdminModel,
  "admin",
  {},
  {
    getOne: "/api/admin/admin",
    post: false
  }
);
