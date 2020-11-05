const PartnerRepo = require("../repositories/partner");
const response = require("../helpers/response");


const listPartner = async ctx => {
    try {
        let listpartner = await PartnerRepo.list();
        response.successResponse(ctx, listpartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const resetPasswordPartner = async ctx => {
    try {
        let formdata = ctx.request.body;
        let resetPasswordPartner = await PartnerRepo.reset(formdata);
        response.successResponse(ctx, resetPasswordPartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const sendEmailPasswordPartner = async ctx => {
    try {
        let formdata = ctx.request.body;
        let resetPasswordPartner = await PartnerRepo.sendforgot(formdata);
        response.successResponse(ctx, resetPasswordPartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updateForgotPasswordPartner = async ctx => {
    try {
        let formdata = ctx.request.body;
        let resetPasswordPartner = await PartnerRepo.updateForgotPassword(formdata);
        response.successResponse(ctx, resetPasswordPartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const completKyc = async ctx => {
    try {
        const Id = ctx.current_user.id;
        let completKyc = await PartnerRepo.completkyc(Id);
        response.successResponse(ctx, completKyc);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findPartner = async ctx => {
    try {
        const Id = ctx.params.id;
        let findPartner = await PartnerRepo.findbyId(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "PARTNER_NOT_FOUND",
                message: "Partner not found"
            });
        } else {
            response.successResponse(ctx, findPartner);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addPartner = async ctx => {
    try {
        const body = ctx.request.body;
        let addPartner = await PartnerRepo.add(body);
        response.successResponse(ctx, addPartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updatePartner = async ctx => {
    try {
        const Id = ctx.params.id;
        const body = ctx.request.body;
        let updatePartner = await PartnerRepo.update(Id, body);
        response.successResponse(ctx, updatePartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updatePasswordPartner = async ctx => {
    try {
        const Id = ctx.params.id;
        const body = ctx.request.body;
        let updatePartner = await PartnerRepo.updatePassword(Id, body);
        response.successResponse(ctx, updatePartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const deletePartner = async ctx => {
    try {
        const Id = ctx.params.id;
        let deletePartner = await PartnerRepo.deleted(Id);
        response.successResponse(ctx, deletePartner);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    listPartner,
    resetPasswordPartner,
    sendEmailPasswordPartner,
    updateForgotPasswordPartner,
    completKyc,
    findPartner,
    addPartner,
    updatePartner,
    updatePasswordPartner,
    deletePartner
}

