var gulp = require("gulp");
var change = require("gulp-change");
var shell = require("gulp-shell");
var runInSequence = require("run-sequence").use(gulp);
const indonesia = require("indonesia");
const Country = require("./models/countries");
const Province = require("./models/provinces");
const City = require("./models/cities");

const DEV_DB_HOST = "10.130.119.172";
const DEV_DB_USER = "root";
const DEV_DB_PASSWORD = "2Auto!!!";
const DEV_DB_NAME = "two_auto_service_dev";
const DEV_REDIS_HOST = "10.130.119.172";
const DEV_REDIS_PASSWORD = "2Auto!!!";
const DEV_S3_FOLDER = "DEV/";
const DEV_REDIS_PREFIX = "twa_";

const LOCAL_DB_HOST = "localhost";
const LOCAL_DB_USER = "root";
const LOCAL_DB_PASSWORD = "";
const LOCAL_DB_NAME = "two_auto_service_dev";
const LOCAL_REDIS_HOST = "localhost";
const LOCAL_REDIS_PASSWORD = "";

const PROD_DB_HOST = "10.130.119.172";
const PROD_DB_USER = "root";
const PROD_DB_PASSWORD = "2Auto!!!";
const PROD_DB_NAME = "two_auto_service_prod";
const PROD_REDIS_HOST = "10.130.119.172";
const PROD_REDIS_PASSWORD = "2Auto!!!";
const PROD_S3_FOLDER = "PROD/";
const PROD_REDIS_PREFIX = "twa_prod_";

function setLocalDbHost(content) {
  return content.replace(/host:.+/g, "host: 'localhost',");
}

function setLocalDbHost(content) {
  return content.replace(/host:.+/g, "host: '" + LOCAL_DB_HOST + "',");
}

function setLocalDbUser(content) {
  return content.replace(/user:.+/g, "user: '" + LOCAL_DB_USER + "',");
}

function setLocalDbPassword(content) {
  return content.replace(
    /password:.+/g,
    "password: '" + LOCAL_DB_PASSWORD + "',"
  );
}

function setLocalDbName(content) {
  return content.replace(/dbname:.+/g, "dbname: '" + LOCAL_DB_NAME + "',");
}

function setLocalRedisHost(content) {
  return content.replace(
    /redisHost:.+/g,
    "redisHost: '" + LOCAL_REDIS_HOST + "',"
  );
}

function setLocalRedisPassword(content) {
  return content.replace(
    /redisPassword:.+/g,
    "redisPassword: '" + LOCAL_REDIS_PASSWORD + "',"
  );
}

function setDevDbHost(content) {
  return content.replace(/host:.+/g, "host: '" + DEV_DB_HOST + "',");
}

function setDevDbUser(content) {
  return content.replace(/user:.+/g, "user: '" + DEV_DB_USER + "',");
}

function setDevDbPassword(content) {
  return content.replace(
    /password:.+/g,
    "password: '" + DEV_DB_PASSWORD + "',"
  );
}

function setDevDbName(content) {
  return content.replace(/dbname:.+/g, "dbname: '" + DEV_DB_NAME + "',");
}

function setDevRedisHost(content) {
  return content.replace(
    /redisHost:.+/g,
    "redisHost: '" + DEV_REDIS_HOST + "',"
  );
}

function setDevRedisPassword(content) {
  return content.replace(
    /redisPassword:.+/g,
    "redisPassword: '" + DEV_REDIS_PASSWORD + "',"
  );
}

function setDevS3Folder(content) {
  return content.replace(
    /S3FolderPrefix:.+/g,
    "S3FolderPrefix: '" + DEV_S3_FOLDER + "'"
  );
}

function setDevRedisPrefix(content) {
  return content.replace(
    /redisPrefix:.+/g,
    "redisPrefix: '" + DEV_REDIS_PREFIX + "',"
  );
}

function setProdDbHost(content) {
  return content.replace(/host:.+/g, "host: '" + PROD_DB_HOST + "',");
}

function setProdDbUser(content) {
  return content.replace(/user:.+/g, "user: '" + PROD_DB_USER + "',");
}

function setProdDbPassword(content) {
  return content.replace(
    /password:.+/g,
    "password: '" + PROD_DB_PASSWORD + "',"
  );
}

function setProdDbName(content) {
  return content.replace(/dbname:.+/g, "dbname: '" + PROD_DB_NAME + "',");
}

function setProdRedisHost(content) {
  return content.replace(
    /redisHost:.+/g,
    "redisHost: '" + PROD_REDIS_HOST + "',"
  );
}

function setProdRedisPassword(content) {
  return content.replace(
    /redisPassword:.+/g,
    "redisPassword: '" + PROD_REDIS_PASSWORD + "',"
  );
}

function setProdRedisPrefix(content) {
  return content.replace(
    /redisPrefix:.+/g,
    "redisPrefix: '" + PROD_REDIS_PREFIX + "',"
  );
}

function setProdS3Folder(content) {
  return content.replace(
    /S3FolderPrefix:.+/g,
    "S3FolderPrefix: '" + PROD_S3_FOLDER + "'"
  );
}

function setDevMigrationDB(content) {
  return content.replace(
    /"database":.+/g,
    "\"database\": \"" + DEV_DB_NAME + "\","
  );
}

function setDevMigrationHost(content) {
  return content.replace(
    /"host":.+/g,
    "\"host\": \"" + DEV_DB_HOST + "\","
  );
}

function setDevMigrationUser(content) {
  return content.replace(
    /"username":.+/g,
    "\"username\": \"" + DEV_DB_USER + "\","
  );
}

function setDevMigrationPassword(content) {
  return content.replace(
    /"password":.+/g,
    "\"password\": \"" + DEV_DB_PASSWORD + "\","
  );
}

//

function setProdMigrationDB(content) {
  return content.replace(
    /"database":.+/g,
    "\"database\": \"" + PROD_DB_NAME + "\","
  );
}

function setProdMigrationHost(content) {
  return content.replace(
    /"host":.+/g,
    "\"host\": \"" + PROD_DB_HOST + "\","
  );
}

function setProdMigrationUser(content) {
  return content.replace(
    /"username":.+/g,
    "\"username\": \"" + PROD_DB_USER + "\","
  );
}

function setProdMigrationPassword(content) {
  return content.replace(
    /"password":.+/g,
    "\"password\": \"" + PROD_DB_PASSWORD + "\","
  );
}

gulp.task("config:dev", function() {
  return gulp
    .src("./config/index.js")
    .pipe(change(setDevDbHost))
    .pipe(change(setDevDbUser))
    .pipe(change(setDevDbPassword))
    .pipe(change(setDevDbName))
    .pipe(change(setDevRedisHost))
    .pipe(change(setDevRedisPassword))
    .pipe(change(setDevS3Folder))
    .pipe(change(setDevRedisPrefix))
    .pipe(gulp.dest("./config"));
});

gulp.task("config:prod", function() {
  return gulp
    .src("./config/index.js")
    .pipe(change(setProdDbHost))
    .pipe(change(setProdDbUser))
    .pipe(change(setProdDbPassword))
    .pipe(change(setProdDbName))
    .pipe(change(setProdRedisHost))
    .pipe(change(setProdRedisPassword))
    .pipe(change(setProdS3Folder))
    .pipe(change(setProdRedisPrefix))
    .pipe(gulp.dest("./config"));
});

gulp.task("config:local", function() {
  return gulp
    .src("./config/index.js")
    .pipe(change(setLocalDbHost))
    .pipe(change(setLocalDbUser))
    .pipe(change(setLocalDbPassword))
    .pipe(change(setLocalDbName))
    .pipe(change(setLocalRedisHost))
    .pipe(change(setLocalRedisPassword))
    .pipe(change(setDevRedisPrefix))
    .pipe(gulp.dest("./config"));
});

gulp.task("migration:dev", function() {
  return gulp
    .src("./config/config.json")
    .pipe(change(setDevMigrationDB))
    .pipe(change(setDevMigrationHost))
    .pipe(change(setDevMigrationUser))
    .pipe(change(setDevMigrationPassword))
    .pipe(gulp.dest("./config"));
});

gulp.task("migration:prod", function() {
  return gulp
    .src("./config/config.json")
    .pipe(change(setProdMigrationDB))
    .pipe(change(setProdMigrationHost))
    .pipe(change(setProdMigrationUser))
    .pipe(change(setProdMigrationPassword))
    .pipe(gulp.dest("./config"));
});

gulp.task("seed:provinces", function() {
  Country.create({
    name: "Indonesia"
  })
    .then(resCountry => {
      indonesia.getProvinces(function(resProvince) {
        resProvince.map(prov => {
          Province.create({
            name: prov.name,
            country_id: resCountry.id
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

gulp.task("seed:cities", function() {
  Province.findAll().then(res => {
    res.map(p => {
      indonesia.getProvince(p.name, true, function(resCity) {
        resCity.cities.map(city => {
          City.create({
            name: city.name,
            province_id: p.id
          });
        });
      });
    });
  });
});
