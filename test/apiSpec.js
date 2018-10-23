const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const helpers = require("./helper");

const app = require("../server");
const UserModel = require("../api/resources/user/model");

chai.use(chaiHttp);

const createApiSpec = (model, resourceName, newResource) => {
  describe(`/${resourceName}`, () => {
    beforeEach(async () => {
      await helpers.dropDb();
      const user = await UserModel.create({ name: "maxime" });
    });

    afterEach(async () => {
      await helpers.dropDb();
    });

    describe(`POST /${resourceName}`, () => {
      it(`should create a ${resourceName}`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/${resourceName}`)
          .send(newResource);

        expect(result).to.have.status(201);
        expect(result).to.be.json;
      });
    });

    describe(`GET /${resourceName}`, () => {
      it(`should get all ${resourceName}s`, async () => {
        const result = await chai.request(app).get(`/api/${resourceName}`);
        expect(result).to.have.status(200);
        expect(result).to.be.json;
      });
    });
  });
};

module.exports = createApiSpec;
