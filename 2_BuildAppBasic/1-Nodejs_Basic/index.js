const server = require('./server');
const router = require('./route');
const requestHandlers = require('./requestHandlers');

const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload
};

server.start(router.route,handle);