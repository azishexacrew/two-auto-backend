const cacheService = require('../db/cache');
const Provinces = require('../models/provinces');

const list = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cacheService.getCache('provinces');
            if (cache) {
                resolve(cache);
            } else {
                const provinces = await Provinces.findAll()
                await cacheService.setCache('provinces', provinces);
                resolve(provinces);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const findbyId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinces = await Provinces.findOne({
                where: {
                    id: Id,
                },
            });
            if (!provinces) {
                reject({
                    code: "PROVINCE_NOT_FOUND",
                    message: "Province Not Found"
                });
            } else {
                resolve(provinces);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const newProvinces = await Provinces.create({
                name: body.name,
                country_id: body.country_id,
            });
            await cacheService.delCache("provinces");
            resolve(newProvinces);
        } catch (error) {
            reject(error);
        }
    });
}

const update = async (Id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinces = await Provinces.update({
                name: body.name,
                country_id: body.country_id
            }, {
                where: {
                    id: Id,
                },
            })
            await cacheService.delCache("provinces");
            const getprovinces = await Provinces.findOne({
                where: {
                    id: Id,
                },
            });
            resolve(getprovinces);
        } catch (error) {
            reject(error);
        }
    });
}

const deleted = async Id => {
    return new Promise(async (resolve, reject) => {
    try {
        await Provinces.destroy({
            where: {
                id: Id,
            },
        });
        await cacheService.delCache("provinces");
        resolve('Provinces was deleted');
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