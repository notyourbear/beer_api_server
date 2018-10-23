const createApiSpec = require("../../../test/apiSpec");
const DrinkModel = require("./model");
const DrinkController = require("./controller");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

createApiSpec(DrinkModel, "drink", {}, { additionalTests, post: false });

function additionalTests(app) {
  describe("DrinkController", () => {
    describe("createOne", () => {
      it("should create a drink", async () => {
        const result = await chai
          .request(app)
          .post("/api/drink")
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
}
