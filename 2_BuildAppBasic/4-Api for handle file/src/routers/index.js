const router = require('express').Router();
const controller = require('../controllers');

let route=(app) => {
    router.post('/upload', controller.upload);
    router.get('/files', controller.getListFiles);
    router.get('/files/:name', controller.download);
    router.delete('/files/:name', controller.deleteFile);
    router.post('/write/:name', controller.writeFile);
    app.use( router);
}

module.exports = route;