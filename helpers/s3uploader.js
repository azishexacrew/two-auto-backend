const aws = require("aws-sdk");
const fs = require("fs");
const config = require('../config');

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      region: config.s3.S3Region,
      // You'll need your service's access keys here
      accessKeyId: config.s3.S3AccessKey,
      secretAccessKey: config.s3.S3SecretKey,
    });

    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      // If you want to specify a different endpoint, such as using DigitalOcean spaces
      endpoint: new aws.Endpoint(config.s3.S3Endpoint),
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: "public-read",
        // You'll input your bucket name here
        Bucket: "2auto",
        Body: stream,
        Key: config.s3.S3FolderPrefix + fileName,
        ContentType: fileType,
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = { uploadFile };