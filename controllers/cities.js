const CitiesRepo = require("../repositories/cities");
const response = require("../helpers/response");

const listCities = async ctx => {
    try {
        let listCities = await CitiesRepo.list();
        response.successResponse(ctx, listCities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const findCities = async ctx => {
    try {
        let Id = ctx.params.id;
        let findCities = await CitiesRepo.findbyId(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "CITY_NOT_FOUND",
                message: "City not found"
            });
        } else {
            response.successResponse(ctx, findCities);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const addCities = async ctx => {
    try {
        let body = ctx.request.body;
        let addCities = await CitiesRepo.add(body);
        response.successResponse(ctx, addCities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const updateCities = async ctx => {
    try {
        let Id = ctx.params.id;
        let body = ctx.request.body;
        let updateCities = await CitiesRepo.update(Id, body);
        response.successResponse(ctx, updateCities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const deleteCities = async ctx => {
    try {
        let Id = ctx.params.id;
        let deleteCities = await CitiesRepo.deleted(Id);
        response.successResponse(ctx, deleteCities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

module.exports = {
    listCities,
    findCities,
    addCities,
    updateCities,
    deleteCities
}