const Facilities = require("../models/facilities");
const Workshop = require("../models/partner_workshop");
const cacheService = require("../db/cache");
const _ = require("lodash");

const list = async ctx => {
  return new Promise(async (resolve, reject) => {
    try {
      let cache = await cacheService.getCache(
        `facilities_${ctx.current_user.id}`
      );
      if (cache) {
        resolve(cache);
      } else {
        const facilities = await Facilities.findAll();
        const facilitiesWithWorkshop = await Promise.all(
          facilities.map(async fc => {
            const objFc = JSON.parse(JSON.stringify(fc));
            objFc.workshop = await Workshop.findOne({
              where: {
                id: fc.workshop_id
              }
            });
            return objFc;
          })
        );

        // filter current
        let filtered = _.filter(facilitiesWithWorkshop, f => {
          if (f.workshop) {
            return f.workshop.partner_id === ctx.current_user.id;
          } else {
            return false;
          }
        });

        await cacheService.setCache(
          `facilities_${ctx.current_user.id}`,
          filtered
        );
        resolve(filtered);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const findByWorkshopId = async workshop_id => {
  return new Promise(async (resolve, reject) => {
    try {
      const facilities = await Facilities.findAll({
        where: {
          workshop_id
        }
      });
      resolve(facilities);
    } catch (error) {
      reject(error);
    }
  });
};

const findbyId = async Id => {
  return new Promise(async (resolve, reject) => {
    try {
      const facilities = await Facilities.findOne({
        where: {
          id: Id
        }
      });
      resolve(facilities);
    } catch (error) {
      reject(error);
    }
  });
};

const add = async (name, workshop_id, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newfacilities = await Facilities.create({
        name: name,
        workshop_id: workshop_id
      });
      await cacheService.delCache(`facilities_${ctx.current_user.id}`);
      resolve(newfacilities);
    } catch (error) {
      reject(error);
    }
  });
};

const updatebyId = async (Id, name, workshop_id, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      const facilities = await Facilities.update(
        {
          name: name,
          workshop_id: workshop_id
        },
        {
          where: {
            id: Id
          }
        }
      );
      const findfacilities = await Facilities.findOne({
        where: {
          id: Id
        }
      });
      await cacheService.delCache(`facilities_${ctx.current_user.id}`);
      resolve(findfacilities);
    } catch (error) {
      reject(error);
    }
  });
};

const deletebyId = async (Id, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await Facilities.update(
        {
          isDeleted: true
        },
        {
          where: {
            id: Id
          }
        }
      );
      const deleted = await Facilities.destroy({
        where: {
          id: Id
        }
      });
      await cacheService.delCache(`facilities_${ctx.current_user.id}`);
      resolve("Facilities was deleted");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  list,
  findbyId,
  add,
  updatebyId,
  deletebyId,
  findByWorkshopId
};
