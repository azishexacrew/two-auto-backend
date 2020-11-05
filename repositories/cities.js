const cacheService = require('../db/cache');
const Cities = require('../models/cities');

const list = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cacheService.getCache('cities');
            if (cache) {
                resolve(cache);
            } else {
                const cities = await Cities.findAll()
                await cacheService.setCache('cities', cities);
                resolve(cities);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const findbyId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const cities = await Cities.findOne({
                where: {
                    id: Id,
                },
            });
            if (!cities) {
                reject({
                    code: "CITY_NOT_FOUND",
                    message: "City Not Found"
                });
            } else {
                resolve(cities);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const newCities = await Cities.create({
                name: body.name,
                province_id: body.province_id,
            });
            await cacheService.delCache("cities");
            resolve(newCities);
        } catch (error) {
            reject(error);
        }
    });
}

const update = async (Id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cities = await Cities.update({
                name: body.name,
                province_id: body.province_id,
            }, {
                where: {
                    id: Id,
                },
            })
            await cacheService.delCache("cities");
            const getcities = await Cities.findOne({
                where: {
                    id: Id,
                },
            });
            resolve(getcities);
        } catch (error) {
            reject(error);
        }
    });
}

const deleted = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            await Cities.destroy({
                where: {
                    id: Id,
                },
            });
            await cacheService.delCache("cities");
            resolve('cities was deleted');
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