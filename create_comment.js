let articles = require('./articles');
const helper = require('./helper');
const handle_errors = require('./handle_errors');

module.exports =  async function createComment(req, res, payload, cb) {
    let index = articles.findIndex(i => i.id == payload.articleId);
    if (index!=-1){
        if(articles[index].comments === undefined) articles[index].comments = [];
        articles[index].comments.push({"id": helper.random_id(),"text": payload.text,"author": payload.author,"date":new Date()});
    }else{
        return handle_errors.invalidRequest(req, res, payload, cb);
    }
    cb(null, articles[index],'application/json');
};