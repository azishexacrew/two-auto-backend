const cacheService = require('../db/cache');
const Workshop_products = require('../models/workshop_products');
const Product = require('../models/products');

const list = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cacheService.getCache('workshop_products');
            if (cache) {
                resolve(cache);
            } else {
                const workshop_products = await Workshop_products.findAll()
                await cacheService.setCache('workshop_products', workshop_products);
                resolve(workshop_products);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const findbyId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const workshop_products = await Workshop_products.findOne({
                where: {
                    id: Id,
                },
            });
            if (!workshop_products) {
                reject({
                    code: "WORKSHOP_PRODUCTS_NOT_FOUND",
                    message: "Workshop Products Not Found"
                });
            } else {
                resolve(workshop_products);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const findbyWorkshopId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const workshop_products = await Workshop_products.findAll({
                where: {
                    workshop_id: Id,
                },
            });
            if (!workshop_products) {
                reject({
                    code: "WORKSHOP_PRODUCTS_NOT_FOUND",
                    message: "Workshop Products Not Found"
                });
            } else {
                const allProducts = await Promise.all(workshop_products.map(async fc => {
                    const objFc = JSON.parse(JSON.stringify(fc));
                    objFc.product = await Product.findOne({
                        where: {
                            id: fc.products_id
                        }    
                    })
                    return objFc;
                }));
                resolve(allProducts);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const newworkshop_products = await Workshop_products.create({
                workshop_id: body.workshop_id,
                products_id: body.products_id,
            });
            await cacheService.delCache("workshop_products");
            resolve(newworkshop_products);
        } catch (error) {
            reject(error);
        }
    });
};

const update = async (Id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workshop_products = await Workshop_products.update({
                workshop_id: body.workshop_id,
                products_id: body.products_id,
            }, {
                where: {
                    id: Id,
                },
            });
            await cacheService.delCache("workshop_products");
            resolve(workshop_products);
        } catch (error) {
            reject(error);
        }
    });
};

const deleted = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            await Workshop_products.destroy({
                where: {
                    id: Id,
                },
            });
            await cacheService.delCache("workshop_products");
            resolve('workshop products was deleted');
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    list,
    findbyId,
    findbyWorkshopId,
    add,
    update,
    deleted
}