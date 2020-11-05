const cacheService = require('../db/cache');
const Countries = require('../models/countries');

const list = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await cacheService.getCache('countries');
            if (cache) {
                resolve(cache);
            } else {
                const countries = await Countries.findAll()
                await cacheService.setCache('countries', countries);
                resolve(countries);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const findbyId = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            const countries = await Countries.findOne({
                where: {
                    id: Id,
                },
            });
            if (!countries) {
                reject({
                    code: "COUNTRY_NOT_FOUND",
                    message: "Country Not Found"
                });
            } else {
                resolve(countries);
            }
        } catch (error) {
            reject(error);
        }
    });
}

const add = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            const newcountries = await Countries.create({
                name: body.name,
            });
            await cacheService.delCache("countries");
            resolve(newcountries);
        } catch (error) {
            reject(error);
        }
    });
}

const update = async (Id, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const countries = await Countries.update({
                name: body.name,
            }, {
                where: {
                    id: Id,
                },
            })
            await cacheService.delCache("countries");
            const getcountries = await Countries.findOne({
                where: {
                    id: Id,
                },
            });
            resolve(getcountries);
        } catch (error) {
            reject(error);
        }
    });
}

const deleted = async Id => {
    return new Promise(async (resolve, reject) => {
        try {
            await Countries.destroy({
                where: {
                    id: Id,
                },
            });
            await cacheService.delCache("countries");
            resolve('countries was delete');
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