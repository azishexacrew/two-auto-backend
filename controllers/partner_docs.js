const Partner_docsRepo = require("../repositories/partner_docs");
const response = require("../helpers/response");

const addPartner_docs = async ctx => {
    try {
        let body = ctx.request.body;
        let addPartner_docs = await Partner_docsRepo.add(body);
        response.successResponse(ctx, addPartner_docs);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    addPartner_docs
}