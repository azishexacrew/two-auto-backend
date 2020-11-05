const authHelper = require("../helpers/auth");
const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const config = require('../config');

const login = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let admin = await authHelper.authenticateUser(Admin, email, password);
      delete admin.dataValues.password;
      const token = jwt.sign({ email: admin.email, role: 'admin' }, config.secret);
      const data = {
        user: admin,
        token
      };

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  login
};
