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

let disableAuth;
switch (true) {
  case process.env.NODE_ENV === "testing":
    disableAuth = true;
    break;
  case process.env.DISABLE_AUTH === "true":
    disableAuth = true;
    break;
  default:
    disableAuth = false;
}

module.exports = {
  disableAuth,
  PORT: process.env.PORT,
  db: {
    url: dbURL
  },
  secrets: {
    expireTime: process.env.EXPIRE_TIME,
    JWT_SECRET: process.env.JWT_SECRET
  }
};
