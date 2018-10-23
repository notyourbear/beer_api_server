const drinkModel = require("./model");

const locationModel = require("../location/model");
const beerModel = require("../beer/model");
const userModel = require("../user/model");

module.exports = {
  getAll,
  getByUser,
  findByUser,
  createOne
};

function getAll(req, res, next) {
  let query = drinkModel
    .find({})
    .populate("user beer location")
    .lean();
  Promise.resolve(query.exec())
    .then(drinks => res.status(200).json(drinks))
    .catch(err => next(err));
}

function findByUser(req, res, next) {
  let { user } = req.params;
  let query = drinkModel
    .find({ user })
    .populate("user beer location")
    .lean();
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

  if (!user._id) {
    promises.push(
      userModel
        .findOne({ name: user.name })
        .lean()
        .exec()
        .then(foundUser => (user = foundUser))
    );
  }
  if (!beer._id) {
    promises.push(
      beerModel
        .findOne({ name: beer.name })
        .lean()
        .exec()
        .then(foundBeer => {
          return foundBeer
            ? (beer = foundBeer)
            : beerModel.create(beer).then(created => (beer = created));
        })
    );
  }
  if (!location._id) {
    promises.push(
      locationModel
        .findOne({ name: location.name })
        .lean()
        .exec()
        .then(foundLocation => {
          return foundLocation
            ? (location = foundLocation)
            : locationModel
                .create(location)
                .then(created => (location = created));
        })
    );
  }

  let resolved = promises.length
    ? Promise.all(promises)
    : Promise.resolve(true);

  resolved
    .then(() =>
      drinkModel.create({
        user: user._id,
        beer: beer._id,
        location: location._id
      })
    )
    .then(createdDrink => {
      res.status(201).json(createdDrink);
    })
    .catch(err => next(err));
}
