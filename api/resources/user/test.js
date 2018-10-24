const createApiSpec = require("../../../test/apiSpec");
const UserModel = require("./model");
const UserController = require("./controller");

function additionalTests(app, jwt) {
  describe("UserController", () => {
    describe("getOne", () => {
      it("should return a user with the name maxime", async () => {
        const result = await chai
          .request(app)
          .get("/api/user/maxime")
          .set("Authorization", `Bearer ${jwt}`);
        expect(result).to.have.status(200);
        expect(result).to.be.json;
        expect(result.body).to.be.an("object");
        expect(result.body).to.not.have.keys("_id", "name");
        expect(result.body).to.include({ name: "maxime" });
      });
    });
  });
}

createApiSpec(
  UserModel,
  "user",
  { name: "maxime" },
  { getOne: "/api/user/maxime" }
);
