let articles = require('./articles');
const handle_errors = require('./handle_errors');

module.exports =  function deleteComment(req, res, payload, cb) {
    let articleId, index;
    if ((articleId = articles.findIndex(i => i.id == payload.articleId)) != -1 &&
        ((index=articles[articleId].comments.findIndex(i=>i.id == payload.id))!=-1)){
        articles[articleId].comments.splice(index, 1);
    }else{
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles[articleId],'application/json');
};