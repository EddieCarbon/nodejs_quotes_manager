
const fs = require('fs');
const path = require('path');
const url = require('url');

const mimeTypes = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".json" : "application/json",
    ".css" : "text/css",
    ".png" : "image/png",
    ".jpg" : "image/jpg",
}

function serverStaticFile(req, res) {
    const baseURL = req.protocol + "://" + req.headers.host + "/";
    const parsedURL = new URL(req.url, baseURL);
    //console.log(parsedURL);

    let pathSanitize = path.normalize(parsedURL.pathname);
    //console.log("pathSanitize: " + pathSanitize);
    //console.log("__dirname: " + __dirname);

    let pathName = path.join(__dirname, "..", "static", pathSanitize);
    //console.log("pathName: " + pathName);

    if (fs.existsSync(pathName)) {
        if (fs.statSync(pathName).isDirectory()) {
            pathName += "/index.html";
        }

        fs.readFile(pathName, function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end("File not found: " + err);
            } else {
                const extention = path.parse(pathName).ext;

                res.setHeader("Content-type", mimeTypes[extention]);
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end("File not found");
    }
}

module.exports = {
    serverStaticFile
}