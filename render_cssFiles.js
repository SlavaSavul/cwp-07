const fs = require('fs');

module.exports = function (req, res, payload, cb) {
    fs.readFile('./public/site.css', (err, data)=>{
        cb(null, data, 'text/css');
    })
};