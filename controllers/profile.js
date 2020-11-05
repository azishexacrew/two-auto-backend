const ProfileRepo = require("../repositories/profile");
const response = require("../helpers/response");

const findPartnerkyc = async ctx => {
    try {
        let user = ctx.current_user;
        let findPartnerkyc = await ProfileRepo.partnerkyc(user);
        response.successResponse(ctx, findPartnerkyc);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    findPartnerkyc
}