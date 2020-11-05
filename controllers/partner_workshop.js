const Partner_workshopRepo = require("../repositories/partner_workshop");
const response = require("../helpers/response");

const listPartner_workshop = async ctx => {
    try {
        let listpartner_workshop = await Partner_workshopRepo.list(ctx);
        response.successResponse(ctx, listpartner_workshop);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findPartner_workshop = async ctx => {
    try {
        let Id = ctx.params.id;
        let findPartner_workshop = await Partner_workshopRepo.findbyId(Id);
        if (!findPartner_workshop) {
            return response.errorResponse(ctx, {
                code: "PARTNER_WORKSHOP_NOT_FOUND",
                message: "Partner workshop not found"
            });
        } else {
            response.successResponse(ctx, findPartner_workshop);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addPartner_workshop = async ctx => {
    try {
        let body = ctx.request.body;
        let addPartner_workshop = await Partner_workshopRepo.add(body, ctx);
        response.successResponse(ctx, addPartner_workshop);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addWorkshop_products = async ctx => {
    try {
        let body = ctx.request.body;
        let addPartner_workshop = await Partner_workshopRepo.addProducts(body);
        response.successResponse(ctx, addPartner_workshop);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updateWorkshop_products = async ctx => {
    try {
        let body = ctx.request.body;
        let Id = ctx.params.id;
        let updatePartner_workshop = await Partner_workshopRepo.updateProducts(Id, body);
        response.successResponse(ctx, updatePartner_workshop);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updatePartner_workshop = async ctx => {
    try {
        let body = ctx.request.body;
        let Id = ctx.params.id;
        let updatePartner_workshop = await Partner_workshopRepo.updatebyId(Id, body, ctx);
        response.successResponse(ctx, updatePartner_workshop);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const deletePartner_workshop = async ctx => {
    try {
        let Id = ctx.params.id;
        let deletePartner_workshop = await Partner_workshopRepo.deletebyId(Id, ctx);
        response.successResponse(ctx, {
            code: "PARTNER_WORKSHOP_WAS_DELETED",
            message: "partner workshop was deleted"
        });
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findOpenWorkshop = async ctx => {
    try {
        let Id = ctx.params.id;
        let findPartner_workshop = await Partner_workshopRepo.findOpen(Id);
        if (!findPartner_workshop) {
            return response.errorResponse(ctx, {
                code: "PARTNER_WORKSHOP_NOT_FOUND",
                message: "Partner workshop not found"
            });
        } else {
            response.successResponse(ctx, findPartner_workshop);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findNearestWorkshop = async ctx => {
    try {
        let body = ctx.request.body;
        let workshops = await Partner_workshopRepo.findNearest(body);
        response.successResponse(ctx, workshops);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    listPartner_workshop,
    findPartner_workshop,
    addPartner_workshop,
    updatePartner_workshop,
    deletePartner_workshop,
    findOpenWorkshop,
    findNearestWorkshop,
    addWorkshop_products,
    updateWorkshop_products
};