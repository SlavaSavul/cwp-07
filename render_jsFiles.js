const fs = require('fs');

module.exports.appJs = function (req, res, payload, cb) {
    fs.readFile('./public/index.js', (err, data)=>{
        cb(null, data, 'text/javascript');
    })
};

module.exports.formJs = function (req, res, payload, cb) {
    fs.readFile('./public/form.js', (err, data)=>{
        cb(null, data, 'text/javascript');
    })
};