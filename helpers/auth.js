const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const validateEmail = async (Model, email) => {
  return new Promise(async (resolve, reject) => {
    const user = await Model.findOne({ where: { email } });
    if (user) {
      reject("Email has been registered");
    } else {
      resolve(true);
    }
  });
};

const authenticateUser = async (Model, email, password) => {
  return new Promise(async (resolve, reject) => {
    const user = await Model.findOne({ where: { email } });
    if (!user) {
      reject("User not found");
    }

    const same = await bcrypt.compare(password, user.password);
    if (!same) {
      reject("Invalid password");
    } else {
      resolve(user);
    }
  });
}

const passwordEncrypt = async password => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

const generateToken = async (email, role) => {
  return jwt.sign({email, role}, config.secret);
};

module.exports = {
    validateEmail,
    passwordEncrypt,
    authenticateUser,
    generateToken
};
