module.exports = (error, req, res, next) => {
  console.error(error.stack);
  return error.message === "No authorization token was found"
    ? res.status(401).send(error.message)
    : res.status(500).send(error.message || error.toString());
};
