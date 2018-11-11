/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below.
 *
 * name: zhixuan li
 * email: lizhix@oregonstate.edu
 */

var PORT = 3000;       //端口
var DIR = './public';     //用于存放html的目录

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
	if (pathname=="/") {
		pathname="/index.html";
	}
    var realPath = path.join(DIR, pathname);
    
	
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
			pathname="/404.html";
			realPath = path.join(DIR, pathname);
			fs.readFile(realPath, "binary", function (err, file404) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/html";
                    response.writeHead(404, {
                        'Content-Type': contentType
                    });
                    response.write(file404, "binary");
                    response.end();
                }
            });

        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");