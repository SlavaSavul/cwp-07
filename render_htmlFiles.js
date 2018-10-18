const fs = require('fs');

module.exports.indexHtml = function(req, res, payload, cb){
    fs.readFile('./public/index.html', (err, data) => {
        cb(null, data, 'text/html');
    });
};

module.exports.formHtml = function(req, res, payload, cb){
    fs.readFile('./public/form.html', (err, data) => {
        cb(null, data, 'text/html');
    });
};