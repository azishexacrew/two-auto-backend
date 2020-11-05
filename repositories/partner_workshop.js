const Partner_workshop = require("../models/partner_workshop");
const Workshop_products = require("../models/workshop_products");
const Facilities = require("../models/facilities");
const Products = require("../models/products");
const FacilitiesRepo = require("./facilities");
const ProductsRepo = require("./workshop_products");
const cacheService = require("../db/cache");
const moment = require("moment");
const _ = require("lodash");
const { insideCircle } = require("geolocation-utils");

const list = async ctx => {
  return new Promise(async (resolve, reject) => {
    try {
      const cache = await cacheService.getCache(
        `partner_workshop_${ctx.current_user.id}`
      );
      if (cache) {
        resolve(cache);
      } else {
        const partner_workshop = await Partner_workshop.findAll({
          where: {
            partner_id: ctx.current_user.id
          }
        });
        await cacheService.setCache(
          `partner_workshop_${ctx.current_user.id}`,
          partner_workshop
        );
        resolve(partner_workshop);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const findbyId = async Id => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner_workshop = await Partner_workshop.findOne({
        where: {
          id: Id
        }
      });

      // modify object
      let workshop = _.clone(partner_workshop.dataValues);
      let facilities_data = await FacilitiesRepo.findByWorkshopId(workshop.id);
      let products_data = await ProductsRepo.findbyWorkshopId(workshop.id);
      workshop.facilities = facilities_data;
      workshop.products = products_data;
      resolve(workshop);
    } catch (error) {
      reject(error);
    }
  });
};

const add = async (body, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPartner_workshop = await Partner_workshop.create({
        name: body.name,
        category: body.category,
        phone: body.phone,
        email: body.email,
        openAt: body.openAt,
        closeAt: body.closeAt,
        day_pattern: body.day_pattern,
        longitude: body.longitude,
        latitude: body.latitude,
        image_url: body.image_url,
        address: body.address,
        rating: body.rating,
        city_id: body.city_id,
        partner_id: body.partner_id
      });
      await cacheService.delCache(`partner_workshop_${ctx.current_user.id}`);
      resolve(newPartner_workshop);
    } catch (error) {
      reject(error);
    }
  });
};

const updatebyId = async (Id, body, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner_workshop = await Partner_workshop.update(
        {
          name: body.name,
          category: body.category,
          phone: body.phone,
          email: body.email,
          openAt: body.openAt,
          closeAt: body.closeAt,
          day_pattern: body.day_pattern,
          longitude: body.longitude,
          latitude: body.latitude,
          image_url: body.image_url,
          address: body.address,
          rating: body.rating,
          city_id: body.city_id
        },
        {
          where: {
            id: Id
          }
        }
      );
      const findpartner_workshop = await Partner_workshop.findOne({
        where: {
          id: Id
        }
      });
      await cacheService.delCache(`partner_workshop_${ctx.current_user.id}`);
      resolve(findpartner_workshop);
    } catch (error) {
      reject(error);
    }
  });
};

const deletebyId = async (Id, ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Partner_workshop.update(
        {
          isDeleted: true
        },
        {
          where: {
            id: Id
          }
        }
      );
      await Partner_workshop.destroy({
        where: {
          id: Id
        }
      });
      await cacheService.delCache(`partner_workshop_${ctx.current_user.id}`);
      resolve("partner workshop was delete");
    } catch (error) {
      ctx.status = 400;
      reject(error);
    }
  });
};

const findOpen = async Id => {
  return new Promise(async (resolve, reject) => {
    try {
      const partner_workshop = await Partner_workshop.findOne({
        where: {
          id: Id
        }
      });

      if (!partner_workshop) {
        return reject({
          code: "WORKSHOP_NOT_FOUND",
          message: "workshop not found"
        });
      }

      // let now = moment().format("ddd HH:mm");
      let days = partner_workshop.day_pattern
        .split(",")
        .map(x => parseInt(x, 10));
      // let weekday = days.map(b => moment(b, 'e').format('ddd'));
      const open = parseTime(partner_workshop.openAt);
      const close = parseTime(partner_workshop.closeAt);

      let available = false;
      let today = moment().weekday();
      let hour = moment().hours();
      let minutes = moment().minutes();
      if (today === 0) {
        today = 7;
      }

      if (days.indexOf(today) !== -1) {
        // check for hour
        if (hour >= open.hour && hour <= close.hour) {
          // check for time
          if (close.hour === hour && minutes > close.minutes) {
            available = false;
          } else {
            available = true;
          }
        }
      } else {
        available = false;
      }

      const pattern = {
        days,
        open: open.parsed,
        close: close.parsed,
        now: moment().format("LLLL"),
        available
      };
      resolve(pattern);
    } catch (error) {
      reject(error);
    }
  });
};

const findNearest = async body => {
  return new Promise(async (resolve, reject) => {
    try {
      let radius = body.radius || 20000;
      let redisQuery = `_geo_lat${body.lat}lon${body.lng}rad${radius}`;

      let locationCache = await cacheService.getCache(redisQuery);
      if (locationCache) {
        resolve(locationCache);
      } else {
        let workshops = await Partner_workshop.findAll();
        let nearest_workshops = workshops.filter((workshop) => {
          if (workshop.latitude === null || workshop.longitude === null) {
            return false;
          }
          let workshop_location = {lat: workshop.latitude, lon: workshop.longitude};
          let user_location = {lat: body.lat, lon: body.lng};
          return insideCircle(workshop_location, user_location, radius);
        });
        nearest_workshops = await Promise.all(nearest_workshops.map(async workshop => {
          let workshop_obj = JSON.parse(JSON.stringify(workshop));
          let facilities = await Facilities.findAll({
            where: {
              "workshop_id": workshop_obj.id
            }
          });
          let products = await Products.findAll({
            include: [
              {
                model: Partner_workshop,
                through: Workshop_products,
                where: {
                  "id": workshop_obj.id
                }
              }
            ]
          });
          workshop_obj.facilities = facilities;
          workshop_obj.products = products;
          return workshop_obj;
        }));
        cacheService.setCache(redisQuery, nearest_workshops);
        resolve(nearest_workshops);
      }
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });
};

function parseTime(time) {
  let timeInt = parseInt(time);
  let minutes = time.substring(3, 5);

  // you could then add or subtract time here as needed

  if (time > "12:00") {
    return {
      hour: timeInt,
      minutes: parseInt(minutes),
      parsed: `${timeInt - 12}:${minutes} PM`
    };
  } else {
    return {
      hour: timeInt,
      minutes: parseInt(minutes),
      parsed: `${timeInt}:${minutes} AM`
    };
  }
}

const addProducts = async body => {
  return new Promise(async (resolve, reject) => {
    try {
      let promises = [];
      body.products_id.forEach(pid => {
        const workshopProducts = Workshop_products.create({
          products_id: pid,
          workshop_id: body.workshop_id
        });

        promises.push(workshopProducts);
      });
      
      const allWorkshopProducts = await Promise.all(promises);
      resolve(body.products_id);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const updateProducts = async (workshop_id, body) => {
  return new Promise(async (resolve,) => {
    try {
      await Workshop_products.destroy({
        where: {
          workshop_id: workshop_id
        }
      });
      
      body.workshop_id = workshop_id;
      
      const allWorkshopProducts = await addProducts(body);
      resolve(allWorkshopProducts);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};


// const updateProducts = async (Id, body) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const workshop_products = await Workshop_products.update(
//         {
//           products_id: body.products_id,
//           workshop_id: body.workshop_id
//         },
//         {
//           where: {
//             id: Id
//           }
//         }
//       );
//       const findWorkshop_products = await Workshop_products.findOne({
//         where: {
//           id: Id
//         }
//       });
//       resolve(findWorkshop_products);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

module.exports = {
  list,
  findbyId,
  add,
  updatebyId,
  deletebyId,
  findOpen,
  findNearest,
  updateProducts,
  addProducts
};
