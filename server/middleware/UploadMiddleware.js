const util = require("util");
const multer = require("multer");
const path = require('path')
const uuid = require('uuid')

const maxSize = 20 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/images/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;