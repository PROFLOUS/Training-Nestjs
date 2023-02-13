const http = require('http');
const url = require('url');

function start(route,handle){
    function onRequest(req,res){
        var postData = '';
        const pathname = url.parse(req.url).pathname;
        req.setEncoding('utf8');
        req.addListener('data',function(postDataChunk){
            postData += postDataChunk;
            req.addListener('end',function(){
                console.log('data',postData)
                route(pathname,handle,res,postData);
            });
        });
        

        route(pathname,handle,res);
    }

    http.createServer(onRequest).listen(8888,()=>{
        console.log('Server has started.');
    });

}

exports.start = start;