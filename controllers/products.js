const ProductsRepo = require("../repositories/products");
const response = require("../helpers/response");

const listProducts = async ctx => {
    try {
        let listProducts = await ProductsRepo.list();
        response.successResponse(ctx, listProducts);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findProducts = async ctx => {
    try {
        let Id = ctx.params.id;
        let findProducts = await ProductsRepo.findbyId(Id);
        if (!findPartner) {
            return response.errorResponse(ctx, {
                code: "PRODUCTS_NOT_FOUND",
                message: "Product not found"
            });
        } else {
            response.successResponse(ctx, findProducts);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addProducts = async ctx => {
    try {
        let body = ctx.request.body;
        let addProducts = await ProductsRepo.add(body);
        response.successResponse(ctx, addProducts);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updateProducts = async ctx => {
    try {
        let Id = ctx.params.id;
        let body = ctx.request.body;
        let updateProducts = await ProductsRepo.update(Id, body);
        response.successResponse(ctx, updateProducts);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const deleteProducts = async ctx => {
    try {
        let Id = ctx.params.id;
        let deleteProducts = await ProductsRepo.deleted(Id);
        response.successResponse(ctx, deleteProducts);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    listProducts,
    findProducts,
    addProducts,
    updateProducts,
    deleteProducts
}