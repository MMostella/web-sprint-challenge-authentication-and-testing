const router = require("express").Router();
const bcrypt = require("bcryptjs");
const buildToken = require("./token-builder");

const {
  checkUsernameFree,
  checkForUserInput,
  checkUsernameExists,
} = require("../middleware/auth-middleware");

const Users = require("../users/users-model");

router.get("/users", (req, res, next) => {
  Users.getAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.post(
  "/register",
  checkForUserInput,
  checkUsernameFree,
  (req, res, next) => {
    let user = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user)
      .then((saved) => {
        res.status(201).json(saved);
      })
      .catch(next);
  }
);

router.post(
  "/login",
  checkForUserInput,
  checkUsernameExists,
  (req, res, next) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = buildToken(user);
          res.status(200).json({
            message: `Welcome back ${user.username}!`,
            token,
          });
        } else {
          next({ status: 401, message: "invalid credentials" });
        }
      })
      .catch(next);
  }
);

module.exports = router;
