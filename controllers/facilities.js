const FacilitiesRepo = require("../repositories/facilities");
const response = require("../helpers/response");


const listFacilities = async ctx => {
    try {
        let listfacilities = await FacilitiesRepo.list(ctx);
        response.successResponse(ctx, listfacilities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const findFacilities = async ctx => {
    try {
        let Id = ctx.params.id;
        let findfacilities = await FacilitiesRepo.findbyId(Id);
        if (!findfacilities) {
            return response.errorResponse(ctx, {
                code: "FACILITIES_NOT_FOUND",
                message: "facilities not found"
              });
        } else {
            response.successResponse(ctx, findfacilities);
        }
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const addFacilities = async ctx => {
    try {
        let { name, workshop_id } = ctx.request.body;
        let addfacilities = await FacilitiesRepo.add(name, workshop_id, ctx);
        response.successResponse(ctx, addfacilities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const updateFacilities = async ctx => {
    try {
        let { name, workshop_id } = ctx.request.body;
        let Id = ctx.params.id;
        let updatefacilities = await FacilitiesRepo.updatebyId(Id, name, workshop_id, ctx);
        response.successResponse(ctx, updatefacilities);
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

const deleteFacilities = async ctx => {
    try {
        let Id = ctx.params.id;
        let deletefacilities = await FacilitiesRepo.deletebyId(Id, ctx);
        response.successResponse(ctx, {
            code: "FACILITIES_WAS_DELETED",
            message: "facilities was deleted"
          });
    } catch (error) {
        response.errorResponse(ctx, error);
    }
};

module.exports = {
    listFacilities,
    findFacilities,
    addFacilities,
    updateFacilities,
    deleteFacilities
};