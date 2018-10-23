const createApiSpec = require("../../../test/apiSpec");
const UserModel = require("./model");
const UserController = require("./controller");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

function additionalTests(app) {
  describe("UserController", () => {
    describe("getOne", () => {
      it("should return a user with the name maxime", async () => {
        const result = await chai.request(app).get("/api/user/maxime");
        expect(result).to.have.status(200);
        expect(result).to.be.json;
        expect(result.body).to.be.an("object");
        expect(result.body).to.not.have.keys("_id", "name");
        expect(result.body).to.include({ name: "maxime" });
      });
    });
  });
}

createApiSpec(UserModel, "user", { name: "maxime" }, { additionalTests });
