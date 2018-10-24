const adminModel = require("./model");

module.exports = {
  getAll,
  createOne,
  getOne,
  findByUsername
};

function getAll(req, res, next) {
  let query = adminModel.find({}).lean();
  Promise.resolve(query.exec())
    .then(admins => res.status(200).json(admins))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  Promise.resolve(req.adminFromUsername)
    .then(admin => res.status(200).json(admin))
    .catch(err => next(err));
}

function createOne(req, res, next) {
  let { username, password } = req.body.data;
  let passwordHash = adminModel.hashPassword(password);
  adminModel
    .create({
      username,
      passwordHash
    })
    .then(createdAdmin => {
      res.status(201).json(createdAdmin);
    })
    .catch(err => next(err));
}

function findByUsername(req, res, next) {
  let { username } = req.params;
  let query = adminModel.findOne({ username }).lean();
  return query
    .exec()
    .then(doc => {
      if (!doc) {
        return next(
          new Error(`no admin model found with username: ${username}`)
        );
      }
      req.adminFromUsername = doc;
      return next();
    })
    .catch(err => next(err));
}
