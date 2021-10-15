const User = require("../users/users-model");

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ status: 422, message: "Username taken" });
    }
  } catch (err) {
    next(err);
  }
}

function checkForUserInput(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ message: "username and password required" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkUsernameFree,
  checkForUserInput,
};
