const ProvincesRepo = require("../repositories/provinces");
const response = require("../helpers/response");

const listProvinces = async ctx => {
    try {
        let listProvinces = await ProvincesRepo.list();
        response.successResponse(ctx, listProvinces);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const findProvinces = async ctx => {
    try {
        let Id = ctx.params.id;
        let findProvinces = await ProvincesRepo.findbyId(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "PROVINCE_NOT_FOUND",
                message: "Province not found"
            });
        } else {
            response.successResponse(ctx, findProvinces);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const addProvinces = async ctx => {
    try {
        let body = ctx.request.body;
        let addProvinces = await ProvincesRepo.add(body);
        response.successResponse(ctx, addProvinces);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const updateProvinces = async ctx => {
    try {
        let Id = ctx.params.id;
        let body = ctx.request.body;
        let updateProvinces = await ProvincesRepo.update(Id, body);
        response.successResponse(ctx, updateProvinces);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const deleteProvinces = async ctx => {
    try {
        let Id = ctx.params.id;
        let deleteProvinces = await ProvincesRepo.deleted(Id);
        response.successResponse(ctx, deleteProvinces);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

module.exports = {
    listProvinces,
    findProvinces,
    addProvinces,
    updateProvinces,
    deleteProvinces
}