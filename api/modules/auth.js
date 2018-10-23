const AdminModel = require("../resources/admin/model");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const config = require("../../config");
const checkToken = expressJwt({ secret: config.secrets.JWT_SECRET });

module.exports = {
  signin,
  decodeToken,
  signToken,
  getFreshAdmin,
  verifyAdmin,
  protect: [decodeToken(), getFreshAdmin()]
};

function signin(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user.id);
  res.json({ token: token });
}

function decodeToken() {
  return (req, res, next) => {
    if (config.disableAuth) {
      return next();
    }
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty("access_token")) {
      req.headers.authorization = "Bearer " + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
}

function getFreshUser() {
  return async (req, res, next) => {
    if (config.disableAuth) {
      await AdminModel.remove();
      req.admin = await AdminModel.create({
        adminname: "student1",
        passwordHash: "12334eefs"
      });
      return next();
    }

    return AdminModel.findById(req.admin.id)
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

function verifyUser() {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

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
          if (!admin.authenticate(password)) {
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
      .catch(error => next(err));
  };
}

function signToken(id) {
  return jwt.sign({ id }, config.secrets.JWT_SECRET, {
    expiresIn: config.expireTime
  });
}
