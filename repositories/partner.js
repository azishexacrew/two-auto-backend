const authHelper = require("../helpers/auth");
const bcrypt = require('bcrypt');
const cacheService = require('../db/cache');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');
const uniqid = require('uniqid');
const Partner = require('../models/partner');
const Partner_docs = require('../models/partner_docs');
const Partner_banks = require('../models/partner_bank');
const resetPasswordPrefix = 'partner_password_reset_';


const register = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let valid = await authHelper.validateEmail(Partner, email);
      if (valid) {
        let encryptedPassword = await authHelper.passwordEncrypt(password);
        const newPartner = await Partner.create({
          email: email,
          password: encryptedPassword
        });
        resolve(newPartner);
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
      const partner = await authHelper.authenticateUser(Partner, email, password);
      delete partner.dataValues.password;
      const token = jwt.sign({
        email: partner.email,
        role: 'partner'
      }, config.secret);
      const data = {
        user: partner,
        token
      };

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const list = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const cache = await cacheService.getCache('partners');
      if (cache) {
        resolve(cache);
      } else {
        const partners = await Partner.findAll()
        await cacheService.setCache('partners', partners);
        resolve(partners);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const reset = async formData => {
  return new Promise(async (resolve, reject) => {
    try {
      const resetCode = await generateResetCode(ctx, formData.email);
      resolve(resetCode);
    } catch (error) {
      reject(error);
    }
  });
}

const sendforgot = async formData => {
  return new Promise(async (resolve, reject) => {
    try {
      const resetCode = await generateResetCode(ctx, formData.email);
      const transporter = nodemailer.createTransport({
        service: 'mailgun',
        auth: {
          user: 'postmaster@mg.2-auto.id',
          pass: 'a34a849daa9554104320a17e4767c00e-c8c889c9-a267632e',
        },
      });
      const mailOptions = {
        from: '2-auto Admin <postmaster@mg.2-auto.id>',
        to: formData.email,
        subject: 'Reset Password',
        html: `<h1>Reset Password</h1>
          <p>
            Silahkan 
            <a href="https://app.2-auto.id/reset-password/${resetCode}">Klik Disini</a> 
            untuk menuju ke halaman reset Password
          </p>
          `,
      }
      transporter.sendMail(mailOptions);
      resolve({
        resetCode,
        message: 'Please Check Your Email'
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateForgotPassword = async formData => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await cacheService.getCache(`${ resetPasswordPrefix }${ formData.code }`);
      if (!payload) {
        reject({
          code: "INVALID_OR_EXPIRED_CODE",
          message: "Invalid or Expired Code"
        });
      }
      const partner = await Partner.findByPk(payload.id);
      if (!partner) {
        reject({
          code: "PARTNER_NOT_FOUND",
          message: "Partner Not Found"
        });
      }
      partner.password = await passwordEncrypt(ctx, formData.newPassword);
      cacheService.delCache(`${ resetPasswordPrefix }${ formData.code }`);
      partner.save();
      resolve("success")
    } catch (error) {
      reject(error);
    }
  });
}

const generateResetCode = async (ctx, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner = await Partner.findOne({
        where: {
          email
        }
      })
      if (!partner) {
        reject({
          code: "PARTNER_NOT_FOUND",
          message: "Partner Not Found"
        });
      }
      const code = uniqid.time()
      cacheService.setCache(`${ resetPasswordPrefix }${ code }`, {
        id: partner.id
      }, 3600);
      return code;
    } catch (error) {
      reject(error);
    }
  });
}

const passwordEncrypt = async (ctx, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!password) {
        reject({
          code: "NO_PASSWORD_DETECTED",
          message: "No Password Detected"
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      reject(error);
    }
  });
};

const completkyc = async Id => {
  return new Promise(async (resolve, reject) => {
    try {
      let partner = await Partner.findOne({
        where: {
          id: Id
        }
      })
      let docs = await Partner_docs.findOne({
        where: {
          partner_id: Id
        }
      });
      let banks = await Partner_banks.findOne({
        where: {
          partner_id: Id
        }
      });
      if (
        partner &&
        partner.name != null &&
        partner.phone != null &&
        partner.passport != null &&
        partner.address != null &&
        // partner.longitude != null &&
        // partner.latitude != null &&
        partner.company_name != null &&
        partner.company_type != null &&
        docs &&
        docs.doc_type != null &&
        docs.doc_file != null &&
        docs.npwp_file != null &&
        docs.npwp != null &&
        banks &&
        banks.bank_name != null &&
        banks.account_number != null &&
        banks.account_name != null &&
        banks.document_file != null &&
        !partner.kyc_complete) {
        await Partner.update({
          kyc_complete: true
        }, {
          where: {
            id: Id,
          },
        });
        const transporter = nodemailer.createTransport({
          service: 'mailgun',
          auth: {
            user: 'postmaster@mg.2-auto.id',
            pass: 'a34a849daa9554104320a17e4767c00e-c8c889c9-a267632e',
          },
        });
        const mailOptions = {
          from: '2-auto Admin <postmaster@mg.2-auto.id>',
          to: ctx.current_user.email,
          subject: 'Dokumen Persyaratan telah Diproses',
          html: `<h1>Dokumen Persyaratan telah Diproses</h1>
        <p>
          Selamat dokumen anda telah terpenuhi untuk menjadi partner kami.
        </p>`,
        }
        await transporter.sendMail(mailOptions);
        await cacheService.delCache("partners");
        const getpartner = await Partner.findOne({
          where: {
            id: Id,
          },
        });
        resolve({
          status: 'success',
          message: 'Check Your Email',
          getpartner,
          docs,
          banks,
        });
      } else {
        if (partner.kyc_complete) {
          reject({
            code: "EMAIL_HAS_BEEN_SENT",
            message: "email has been sent"
          });
        } else {
          reject({
            code: "DOCUMENT_HAS_NOT_BEEN_COMPLETED",
            message: "Document has not been completed"
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const findbyId = async (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner = await Partner.findOne({
        where: {
          id: Id,
        },
      });
      if (!partner) {
        reject({
          code: "PARTNER_NOT_FOUND",
          message: "Partner Not Found"
        });
      } else {
        resolve(partner);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const add = async body => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPartner = await Partner.create({
        name: body.name,
        phone: body.phone,
        email: body.email,
        passport: body.passport,
        city_id: body.city_id,
        address: body.address,
        longitude: body.longitude,
        latitude: body.latitude,
        company_name: body.company_name,
        company_type: body.company_type,
        active: body.active,
        isDeleted: body.isDeleted,
        password: bcrypt.hashSync(body.password, 12),
      });
      await cacheService.delCache("partners");
      resolve(newPartner);
    } catch (error) {
      reject(error);
    }
  });
};

const update = async (Id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner = await Partner.update({
        name: body.name,
        phone: body.phone,
        email: body.email,
        passport: body.passport,
        city_id: body.city_id,
        address: body.address,
        longitude: body.longitude,
        latitude: body.latitude,
        company_name: body.company_name,
        company_type: body.company_type,
        active: body.active,
        isDeleted: body.isDeleted,
      }, {
        where: {
          id: Id,
        },
      });
      await cacheService.delCache("partners");
      const getpartner = await Partner.findOne({
        where: {
          id: Id,
        },
      });
      resolve(getpartner);
    } catch (error) {
      reject(error);
    }
  });
};

const updatePassword = async (Id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner = await Partner.update({
        password: bcrypt.hashSync(body.password, 12),
      }, {
        where: {
          id: Id,
        },
      })
      await cacheService.delCache("partners");
      const getpartner = await Partner.findOne({
        where: {
          id: Id,
        },
      });
      resolve(getpartner);
    } catch (error) {
      reject(error);
    }
  });
};

const deleted = async Id => {
  return new Promise(async (resolve, reject) => {
    try {
      await Partner.update({
        isDeleted: true
      }, {
        where: {
          id: Id,
        },
      });
      await Partner.destroy({
        where: {
          id: Id,
        },
      });
      await cacheService.delCache("partners");
      resolve('partner was delete');
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  register,
  login,
  list,
  reset,
  sendforgot,
  updateForgotPassword,
  completkyc,
  findbyId,
  add,
  update,
  updatePassword,
  deleted
};