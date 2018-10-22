module.exports = {
  DEFAULT_PORT: process.env.DEFAULT_PORT,
  db: {
    url:
      process.env.NODE_ENV === "testproduction"
        ? process.env.PROD_DB_URL
        : process.env.DB_URL
  }
};
