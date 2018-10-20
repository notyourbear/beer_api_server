const drinkModel = require("./model");

const locationController = require("../location/controller");
const beerController = require("./beer/controller");

module.exports = {
  getAll,
  getByUser,
  findByUser,
  createOne
};

function getAll(req, res, next) {
  let query = drinkModel.find({}).lean();
  Promise.resolve(query.exec())
    .then(drinks => res.status(200).json(drinks))
    .catch(err => next(err));
}

function findByUser(req, res, next) {
  let { user } = req.params;
  let query = drinkModel.find({ user }).lean();
  return query.exec().then(doc => {
    if (!doc) {
      return next(new Error(`no user model found with id: ${user}`));
    }
    req.drinksByUser = doc;
    return next();
  });
}

function getByUser(req, res, next) {
  Promise.resolve(req.drinksByUser)
    .then(drinks => res.status(200).json(drinks))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  // need to make sure beer and location exist.
  let { beer, location, user } = req.body.data;
  let promises = [];

  if (!beer.id)
    promises.push(
      beerController.createOne(beer).then(created => (beer = created))
    );
  if (!location.id)
    promises.push(
      locationController
        .createOne(location)
        .then(created => (location = created))
    );

  let resolved = promises.length
    ? Promise.all(promises)
    : Promise.resolve(true);
  resolved
    .then(() =>
      drinkModel.create({
        user,
        beer: beer.id,
        locationBeer: location.id
      })
    )
    .then(createdDrink => {
      res.status(201).json(createdDrink);
    })
    .catch(err => next(err));
}
