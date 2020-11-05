const redis = require('redis');
const config = require('../config');

const { redisHost, redisPrefix, redisPort, redisPassword } = config.redis;

const cache = redis.createClient({
  host: redisHost,
  port: redisPort,
  prefix: redisPrefix,
  password: redisPassword
});

const getCache = (key) => {
  return new Promise((resolve, reject) => {
    cache.get(key, function(err, value) {
      // value is null when the key is missing
      if(err) {
        reject(err);
      } else {
        if(value) {
          resolve(JSON.parse(value));
        } else {
          resolve(value);
        }
      }
    });
  });
}

const setCache = (key, value, secondExpire = 60) => {
  cache.set(key, JSON.stringify(value), 'EX', secondExpire);
}

const delCache = (key) => {
  cache.del(key);
}

module.exports = {
  getCache,
  setCache,
  delCache,
};
