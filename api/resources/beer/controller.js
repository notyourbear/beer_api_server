const beerModel = require("./model");

module.exports = {
  getAll,
  createOne
};

function getAll(req, res, next) {
  let query = userModel.find({}).lean();
  Promise.resolve(query.exec())
    .then(users => res.status(200).json(users))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  let beer = req.body.data;
  beerModel
    .create(beer)
    .then(createdBeer => {
      res.status(201).json(createdBeer);
    })
    .catch(err => next(err));
}
