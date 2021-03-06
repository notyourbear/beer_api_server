const AdminModel = require("../resources/admin/model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const config = require("../../config");
const checkToken = expressJwt({
  secret: config.secrets.JWT_SECRET,
  requestProperty: "admin"
});

module.exports = {
  signin,
  decodeToken,
  signToken,
  getFreshAdmin,
  verifyAdmin,
  protect: config.disableAuth
    ? (req, res, next) => next()
    : [decodeToken(), getFreshAdmin()]
};

function signin(req, res, next) {
  // req.admin will be there from the middleware
  // verifyAdmin. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.admin.id);
  res.json({ token: token });
}

function decodeToken() {
  return (req, res, next) => {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it;
    if (req.query && req.query.hasOwnProperty("access_token")) {
      req.headers.authorization = "Bearer " + req.query.access_token;
    }

    // this will call next if token is valid and send error if its not.
    // It will attach the decoded token to req.admin
    checkToken(req, res, next);
  };
}

function getFreshAdmin() {
  return async (req, res, next) => {
    return AdminModel.findById(req.admin.id)
      .lean()
      .exec()
      .then(function(admin) {
        if (!admin) {
          // if no admin is found it was not
          // it was a valid JWT but didn't decode
          // to a real admin in our DB. Either the admin was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send("Unauthorized");
        } else {
          // update req.admin with fresh admin from
          // stale token data
          req.admin = admin;
          next();
        }
      })
      .catch(error => next(error));
  };
}

function verifyAdmin(req, res, next) {
  let { username, password } = req.body.data;
  // if no username or password then send
  if (!username || !password) {
    res.status(400).send("You need a username and password");
    return;
  }

  // look user up in the DB so we can check
  // if the passwords match for the username
  AdminModel.findOne({ username: username })
    .then(function(admin) {
      if (!admin) {
        res.status(401).send("No admin with the given username");
      } else {
        // checking the passowords here
        if (!admin.authenticate(password, admin.passwordHash)) {
          res.status(401).send("Wrong password");
        } else {
          // if everything is good,
          // then attach to req.admin
          // and call next so the controller
          // can sign a token from the req.admin._id
          req.admin = admin;
          next();
        }
      }
    })
    .catch(error => next(error));
}

function signToken(id) {
  return jwt.sign({ id }, config.secrets.JWT_SECRET, {
    expiresIn: config.secrets.expireTime
  });
}
