const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const helpers = require("./helper");

const app = require("../server");
const auth = require("../api/modules/auth");

const AdminModel = require("../api/resources/admin/model");
const UserModel = require("../api/resources/user/model");

chai.use(chaiHttp);

const createApiSpec = (model, resourceName, newResource, options = {}) => {
  options = Object.assign({ post: true, get: true }, options);
  describe(`/${resourceName}`, () => {
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

    afterEach(async () => {
      await helpers.dropDb();
    });

    if (options.post) {
      describe(`POST /${resourceName}`, () => {
        it(`should create a ${resourceName}`, async () => {
          const result = await chai
            .request(app)
            .post(`/api/${resourceName}`)
            .set("Authorization", `Bearer ${jwt}`)
            .send(newResource);

          expect(result).to.have.status(201);
          expect(result).to.be.json;
        });
      });
    }

    if (options.get) {
      describe(`GET /${resourceName}`, () => {
        it(`should get all ${resourceName}s`, async () => {
          const result = await chai
            .request(app)
            .get(`/api/${resourceName}`)
            .set("Authorization", `Bearer ${jwt}`);
          expect(result).to.have.status(200);
          expect(result).to.be.json;
        });
      });
    }

    if (options.getOne) {
      describe(`GET ${options.getOne}`, () => {
        it(`should return json at ${options.getOne}`, async () => {
          const result = await chai
            .request(app)
            .get(`${options.getOne}`)
            .set("Authorization", `Bearer ${jwt}`);

          expect(result).to.have.status(200);
          expect(result).to.be.json;
        });
      });
    }
  });
};

module.exports = createApiSpec;
