const Partner_bank = require('../models/partner_bank');


const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const partner_bank = await Partner_bank.findOne({
                where: {
                    partner_id: body.partner_id,
                }
            });
            if (!partner_bank) {
                const newPartner_bank = await Partner_bank.create({
                    bank_name: body.bank_name,
                    account_number: body.account_number,
                    account_name: body.account_name,
                    document_file: body.document_file,
                    partner_id: body.partner_id,
                });
                resolve(newPartner_bank);
            } else {
                const updatepartner_bank = await Partner_bank.update({
                    bank_name: body.bank_name,
                    account_number: body.account_number,
                    account_name: body.account_name,
                    document_file: body.document_file,
                }, {
                    where: {
                        partner_id: body.partner_id,
                    },
                });
                const getpartner_bank = await Partner_bank.findOne({
                    where: {
                        partner_id: body.partner_id,
                    }
                });
                resolve(updatepartner_bank);
                resolve(getpartner_bank);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    add
}