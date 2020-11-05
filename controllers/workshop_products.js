const Workshop_productsRepo = require("../repositories/workshop_products");
const response = require("../helpers/response");

const listWorkshop_products = async ctx => {
    try {
        let listWorkshop_products = await Workshop_productsRepo.list();
        response.successResponse(ctx, listWorkshop_products);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findWorkshop_products = async ctx => {
    try {
        let Id = ctx.params.id;
        let findWorkshop_products = await Workshop_productsRepo.find(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "PARTNER_PRODUCTS_NOT_FOUND",
                message: "Partner product not found"
            });
        } else {
            response.successResponse(ctx, findWorkshop_products);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addWorkshop_products = async ctx => {
    try {
        let body = ctx.request.body;
        let addWorkshop_products = await Workshop_productsRepo.add(body);
        response.successResponse(ctx, addWorkshop_products);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updateWorkshop_products = async ctx => {
    try {
        let Id = ctx.params.id;
        let body = ctx.request.body;
        let updateWorkshop_products = await Workshop_productsRepo.update(Id, body);
        response.successResponse(ctx, updateWorkshop_products);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const deleteWorkshop_products = async ctx => {
    try {
        let Id = ctx.params.id;
        let deleteWorkshop_products = await Workshop_productsRepo.deleted(Id);
        response.successResponse(ctx, deleteWorkshop_products);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    listWorkshop_products,
    findWorkshop_products,
    addWorkshop_products,
    updateWorkshop_products,
    deleteWorkshop_products
}