const locationModel = require("./model");

module.exports = {
  getAll,
  createOne
};

function getAll(req, res, next) {
  let query = locationModel.find({}).lean();
  Promise.resolve(query.exec())
    .then(locations => res.status(200).json(locations))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  let location = req.body.data;
  locationModel
    .create(location)
    .then(locationBeer => {
      res.status(201).json(locationBeer);
    })
    .catch(err => next(err));
}
