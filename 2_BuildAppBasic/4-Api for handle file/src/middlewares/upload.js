const multer = require('multer');
const util = require('util');
const maxSize = 2 * 1024 * 1024; // 2MB

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split(' ').join('_'));
    }
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
