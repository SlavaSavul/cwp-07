let articles = require('./articles');
const handle_errors = require('./handle_errors');

module.exports = function updateAtricle(req, res, payload, cb) {
	console.log(payload);
    let index;
    index = articles.findIndex(i => i.id == payload.id);
    if(index === -1){
        return handle_errors.invalidRequest(req, res, payload, cb);
    }else{
        articles[index].title = payload.title;
        articles[index].text = payload.text;
        articles[index].author = payload.author;
    }
    cb(null, articles[index],'application/json');
};