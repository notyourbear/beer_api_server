const userModel = require("./model");

module.exports = {
  getAll,
  createOne,
  getOne,
  updateOne,
  findByName
};

function getAll(req, res, next) {
  let query = userModel.find({}).lean();
  Promise.resolve(query.exec())
    .then(users => res.status(200).json(users))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  Promise.resolve(req.userFromId)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
}

function updateOne() {}

function createOne(req, res, next) {
  let user = req.body.data;
  userModel
    .create(user)
    .then(createdUser => {
      res.status(201).json(createdUser);
    })
    .catch(err => next(err));
}

function findByName(req, res, next) {
  let { name } = req.params;
  let query = userModel.findOne({ name }).lean();
  return query
    .exec()
    .then(doc => {
      if (!doc) {
        return next(new Error(`no user model found with name: ${name}`));
      }
      req.userFromId = doc;
      return next();
    })
    .catch(err => next(err));
}
