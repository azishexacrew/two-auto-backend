const authHelper = require("../helpers/auth");
const User = require("../models/user");
const hb = require("handlebars");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const mailer = require("../helpers/mailer");
const cacheService = require("../db/cache");

const resetPasswordPrefix = "user_password_reset_";

const register = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let valid = await authHelper.validateEmail(User, email);
      if (valid) {
        let encryptedPassword = await authHelper.passwordEncrypt(password);
        const newUser = await User.create({
          email: email,
          password: encryptedPassword
        });
        resolve(newUser);
      } else {
        resolve("email already registered");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const login = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let partner = await authHelper.authenticateUser(User, email, password);
      let token = await authHelper.generateToken(email, "user");
      resolve({partner, token});
    } catch (error) {
      reject(error);
    }
  });
};

const sendResetPassword = async email => {
  try {
    const source = fs.readFileSync(
      path.join(__dirname + "/../emails", "reset-password.hbs"),
      "utf8"
    );

    let code = await generateResetCode(email);
    const template = hb.compile(source);
    const payload = {
      passwordResetAddress: `https://app-dev.2-auto.id/user/reset-password/${code}`
    };

    const mailOptions = {
      to: email,
      subject: "Reset Password",
      html: template(payload)
    };
    mailer.sendMail(mailOptions);
  } catch (error) {}
};

const resetPassword = (user, newPassword, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let encryptedPassword = await authHelper.passwordEncrypt(newPassword);
      user.password = encryptedPassword;
      user.save();

      // clean up cache so code cannot be used anymore
      cacheService.delCache(`${resetPasswordPrefix}${code}`);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const generateResetCode = async email => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        reject("user not found");
      }

      const code = uniqid.time();
      cacheService.setCache(
        `${resetPasswordPrefix}${code}`,
        { id: user.id },
        3600
      );
      resolve(code);
    } catch (error) {
      reject(error);
    }
  });
};

const findByEmail = async email => {
  return new Promise(async (resolve, reject) => {
    let user = await User.findOne({
      where: {
        email: email
      }
    });
    resolve(user);
  });
};

const findResetPasswordCode = code => {
  return new Promise(async (resolve, reject) => {
    try {
      let payload = await cacheService.getCache(
        `${resetPasswordPrefix}${code}`
      );
      console.log("PAYLOAD", payload);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
};

const findByPk = id => {
  return User.findByPk(id);
};

const list = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let cache = await cacheService.getCache("users");
      if (cache) {
        resolve(cache);
      } else {
        let users = await User.findAll();
        cacheService.setCache("users", users);
        resolve(users);
      }
    } catch (error) {
      reject(error);
    }  
  });
};

const add = async body => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await User.create({
        username: body.username,
        phone: body.phone,
        email: body.email,
        fullname: body.fullname,
        point: body.point,
        address: body.address,
        password: bcrypt.hashSync(body.password, 12)
      });
      cacheService.delCache("users");
      resolve(newUser);
    } catch (error) {
      reject(error);
    }  
  });
};

const findById = async id => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        where: {
          id
        }
      });
      if (!user) {
        reject({
          code: "USER_NOT_FOUND", 
          message: "User Not Found"
        });
      } else {
        resolve(user);
      } 
    } catch (error) {
      reject(error);
    }  
  });
};

const update = async (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await getOne(id);
      user.username = body.username || user.username;
      user.phone = body.phone || user.phone;
      user.email = body.email || user.email;
      user.fullname = body.fullname || user.fullname;
      user.point = body.point || user.point;
      user.address = body.address || user.address;
      user.password = body.password ? bcrypt.hashSync(body.password, 12) : user.password;
      cacheService.delCache("users");
      user.save();
      resolve(user);
    } catch (error) {
      reject(error);    
    }  
  });
};

const deleted = async Id => {
  return new Promise((resolve, reject) => {
    try {
      User.update({
        isDeleted: true,
      }, {
        where: {
          id: Id,
        }
      })
      User.destroy({
        where: {
          id: Id,
        }
      });
      cacheService.delCache("users");
    } catch (error) {
      reject(error);
    }  
  })
};

module.exports = {
  register,
  login,
  sendResetPassword,
  resetPassword,
  findByEmail,
  findResetPasswordCode,
  findByPk,

  list,
  add,
  findById,
  update,
  deleted
};
