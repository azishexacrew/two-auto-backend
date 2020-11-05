const Partner_docs = require('../models/partner_docs');

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const partner_docs = await Partner_docs.findOne({
                where: {
                    partner_id: body.partner_id,
                },
            });
            if (!partner_docs) {
                const newPartner_docs = await Partner_docs.create({
                    doc_type: body.doc_type,
                    doc_file: body.doc_file,
                    npwp_file: body.npwp_file,
                    npwp: body.npwp,
                    partner_id: body.partner_id,
                });
                resolve(newPartner_docs);
            } else {
                const updatepartner_docs = await Partner_docs.update({
                    doc_type: body.doc_type,
                    doc_file: body.doc_file,
                    npwp_file: body.npwp_file,
                    npwp: body.npwp,
                }, {
                    where: {
                        partner_id: body.partner_id,
                    },
                });
                const getpartner_docs = await Partner_docs.findOne({
                    where: {
                        partner_id: body.partner_id,
                    },
                });
                resolve(updatepartner_docs);
                resolve(getpartner_docs);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    add
}