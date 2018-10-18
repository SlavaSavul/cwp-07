const http = require('http');

const readAll = require('./read_all');
const readArticle = require('./read_article');
const createArticle = require('./create_article');
const updateArticle = require('./update_article');
const deleteArticle = require('./delete_article');
const createComment = require('./create_comment');
const deleteComment = require('./delete_comment');
const helper = require('./helper');
const sum = require('./sum');
const readLog = require('./read_logger');
const cssFiles = require('./render_cssFiles');
const jsFiles = require('./render_jsFiles');
const htmlFiles = require('./render_htmlFiles');



const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/sum': sum,
    '/api/articles/readAll': readAll,
    '/api/articles/read': readArticle,
    '/api/articles/createArticle': createArticle,
    '/api/articles/updateArticle': updateArticle,
    '/api/articles/deleteArticle': deleteArticle,
    '/api/comments/createComment': createComment,
    '/api/comments/deleteComment': deleteComment,
    '/api/logs': readLog,
    '/': htmlFiles.indexHtml,
    '/index.html': htmlFiles.indexHtml,
    '/form.html': htmlFiles.formHtml,
    '/app.js': jsFiles.appJs,
    '/form.js': jsFiles.formJs,
    '/site.css': cssFiles
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result, format) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end( JSON.stringify(err) );
            }
            else{
                helper.updateArticles();
                helper.logger(req.url, payload);
                res.setHeader('Content-Type', format);
                res.statusCode = 200;
                if(format === 'application/json'){
                    res.end(JSON.stringify(result));
                }else{
                    res.end(result);
                }
            }
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        let params = '';
        if (body !== ""){
            params = JSON.parse(body);
        }
        cb(null, params);
    });
}





