const createApiSpec = require("../../../test/apiSpec");
const DrinkModel = require("./model");
const DrinkController = require("./controller");
const AdminModel = require("../admin/model");
const UserModel = require("../user/model");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const helpers = require("../../../test/helper");
const app = require("../../../server");
const auth = require("../../modules/auth");

createApiSpec(DrinkModel, "drink", {}, { post: false });

describe("DrinkModel", () => {
  let jwt;

  beforeEach(async () => {
    await helpers.dropDb();
    const admin = await AdminModel.create({
      username: "admin",
      passwordHash: "12345"
    });
    const user = await UserModel.create({ name: "maxime" });

    jwt = auth.signToken(admin.id);
  });

  describe("createOne", () => {
    it("should create a drink", async () => {
      const result = await chai
        .request(app)
        .post("/api/drink")
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          data: {
            user: { name: "maxime" },
            beer: {
              name: "Champagne Hopi",
              brewery: "Alvarado Street",
              type: "Brut IPA"
            },
            location: { name: "hog's" }
          }
        });
      expect(result).to.have.status(201);
      expect(result).to.be.json;
      expect(result.body).to.be.an("object");
      expect(result.body).to.not.have.keys("_id", "name", "beer", "location");
    });
  });
});
