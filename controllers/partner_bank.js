const Partner_bankRepo = require("../repositories/partner_bank");
const response = require("../helpers/response");

const addPartner_bank = async ctx => {
    try {
        let body = ctx.request.body;
        let addPartner_bank = await Partner_bankRepo.add(body);
        response.successResponse(ctx, addPartner_bank);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    addPartner_bank
}