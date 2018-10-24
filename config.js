require("dotenv").config();

let dbURL;
switch (process.env.NODE_ENV) {
  case "testproduction":
    dbURL = process.env.PROD_DB_URL;
    break;
  case "testing":
    dbURL = process.env.TEST_DB_URL;
    break;
  default:
    dbURL = process.env.DB_URL;
}

module.exports = {
  disableAuth: true,
  PORT: process.env.PORT,
  db: {
    url: dbURL
  },
  secrets: {
    expireTime: process.env.EXPIRE_TIME,
    JWT_SECRET: process.env.JWT_SECRET
  }
};
