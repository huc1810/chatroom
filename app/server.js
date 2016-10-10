/**
 * Created by hsantiago on 10/10/2016.
 */
var port = 3000;
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var send404 = (response, filePath) => {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.' + filePath);
    response.end();
}

sendFile = (response, filePath, fileContents) => {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

var serveStatic = (response, cache, absPath) => {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response, absPath);
            }
        });
    }
}

var requestListener = (request, response) => {
    var filePath = false;
    if (request.url == '/') {
        filePath = '/app/public/index.html';
    } else {
        filePath = '/app/public' + request.url;
    }

    var absPath = '.' + filePath;
    console.log("PATH:" + absPath);
    serveStatic(response, cache, absPath);
}

var server = http.createServer(requestListener);;

server.listen(port, () => {
    console.log("Server listening on port 3000.");
});
console.log("Server running")