module.exports = {
  port: 3000,
  secret: "two-auto",
  database: {
    host: '10.130.119.172',
    port: 3306,
    dbname: 'two_auto_service_prod',
    user: 'root',
    password: '2Auto!!!',
  },
  redis: {
    redisHost: '10.130.119.172',
    redisPort: 6379,
    redisPrefix: 'twa_prod_',
    redisPassword: '2Auto!!!',
  },
  mailer: {
    mailtrap: {
      mailerHost: "smtp.mailtrap.io",
      mailerPort: 2525,
      auth: {
        mailerUser: "f2481d72eb53cb",
        mailerPass: "df566fa61538ff"
      }
    },
    gmail: {
      service: "gmail",
      auth: {
        gmailUser: "service2auto@gmail.com",
        gmailPass: '$password=["two"=>"auto"];'
      }
    }
  },
  s3: {
    S3Region: "sgp1",
    S3Endpoint: "sgp1.digitaloceanspaces.com",
    S3AccessKey: "6BNHVTKH4OPLQJXCWQBY",
    S3SecretKey: "OicOzAJEdCtTMjLiMsxIyhWR6fk8h7P4iDAF2IZmglE",
    S3FolderPrefix: 'PROD/'
  }
};
