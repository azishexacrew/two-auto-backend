const aws = require("aws-sdk");
const Router = require("koa-router");
const multerS3 = require("multer-s3");
const uploadRouter = new Router({ prefix: "/file" });
const uploader = require("../helpers/s3uploader");
const koaBody = require("koa-body");

uploadRouter.use(koaBody({ multipart: true }));

uploadRouter.post("/upload", async ctx => {
  try {
    const file = ctx.request.files.file;
    const { key, url } = await uploader.uploadFile({
      fileName: file.name,
      filePath: file.path,
      fileType: file.type
    });
    ctx.body = { key, url };
  } catch (error) {
    console.log(error);
  }
});

module.exports = uploadRouter;
