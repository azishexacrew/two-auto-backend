const CountriesRepo = require("../repositories/countries");
const response = require("../helpers/response");

const listCountries = async ctx => {
    try {
        let listCountries = await CountriesRepo.list();
        response.successResponse(ctx, listCountries);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const findCountries = async ctx => {
    try {
        let Id = ctx.params.id;
        let findCountries = await CountriesRepo.findbyId(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "COUNTRY_NOT_FOUND",
                message: "Country not found"
            });
        } else {
            response.successResponse(ctx, findCountries);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const addCountries = async ctx => {
    try {
        let body = ctx.request.body;
        let addCountries = await CountriesRepo.add(body);
        response.successResponse(ctx, addCountries);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const updateCountries = async ctx => {
    try {
        let Id = ctx.params.id;
        let body = ctx.request.body;
        let updateCountries = await CountriesRepo.update(Id, body);
        response.successResponse(ctx, updateCountries);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

const deleteCountries = async ctx => {
    try {
        let Id = ctx.params.id;
        let deleteCountries = await CountriesRepo.deleted(Id);
        response.successResponse(ctx, deleteCountries);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
}

module.exports = {
    listCountries,
    findCountries,
    addCountries,
    updateCountries,
    deleteCountries
}