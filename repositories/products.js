const cacheService = require('../db/cache');
const Products = require('../models/products');

const list = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cacheService.getCache('products');
            if (cache) {
                resolve(cache);
            } else {
                const products = await Products.findAll({
                    where: {
                        active: true
                    }
                })
                await cacheService.setCache('products', products);
                resolve(products);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const findbyId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Products.findOne({
                where: {
                    id: Id,
                },
            });
            if (!products) {
                reject({
                    code: "PRODUCTS_NOT_FOUND",
                    message: "Products Not Found"
                });
            } else {
                resolve(products);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const newproducts = await Products.create({
                name: body.name,
                icon: body.icon,
                active: body.active,
            });
            await cacheService.delCache("products");
            resolve(newproducts);
        } catch (error) {
            reject(error);
        }
    });
};

const update = async (Id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Products.update({
                name: body.name,
                icon: body.icon,
                active: body.active,
            }, {
                where: {
                    id: Id,
                },
            })
            await cacheService.delCache("products");
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
};

const deleted = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            await Products.update({
                isDeleted: true
            }, {
                where: {
                    id: Id,
                },
            });
            await Products.destroy({
                where: {
                    id: Id,
                },
            });
            await cacheService.delCache("products");
            resolve('products was deleted');
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    list,
    findbyId,
    add,
    update,
    deleted
}