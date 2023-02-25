const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomErrors = require('../exceptions/exceptions');
const authModels = require('../models/auths.js');

const login = async (body) => {
  try {
    const { username, password } = body;
    const getUser = await authModels.getUserByUsername(username);
    if (getUser.length === 0) {
      throw new CustomErrors('Invalid Username or Password.', 401);
    }
    const user = getUser[0];

    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          reject(new CustomErrors('Internal Server Error.', 500));
        } else {
          resolve(isMatch);
        }
      });
    });

    if (!isMatch) {
      throw new CustomErrors('Invalid Username or Password.', 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log(token);

    return { token };
  } catch (err) {
    console.log(err);
    throw new CustomErrors(err.message);
  }
};

const register = async (body) => {
  try {
    const { username, password, fullname } = body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        throw new CustomErrors(err.message, 400);
      }
      const data = {
        fullname,
        username,
        password: hash,
      };
      console.log(data);
      const addUsers = await authModels.addUsers(data);
      if (addUsers.affectedRows !== 1)
        throw new CustomErrors('Failed to Register.');
      console.log(addUsers);
    });
  } catch (err) {
    console.log(err);
    throw new CustomErrors(err.message);
  }
};
module.exports = { login, register };
