const Partner_docs = require('../models/partner_docs');
const Partner_banks = require('../models/partner_bank');

const partnerkyc = async user => {
    return new Promise(async (resolve, reject) => {
        try {
            let docs = await Partner_docs.findOne({
                where: {
                    partner_id: user.id
                }
            });
            let banks = await Partner_banks.findOne({
                where: {
                    partner_id: user.id
                }
            });
            let general = user;
            let response = {
                general,
                docs,
                banks
            }
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    partnerkyc
}