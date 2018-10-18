let articles = require('./articles');
const handle_errors = require('./handle_errors');

module.exports =  function deleteArticle(req, res, payload, cb) {
    let id;
    if ((id = articles.findIndex(i => i.id == payload.id)) != -1){
        articles.splice(id, 1);
    }else{
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles,'application/json');
};