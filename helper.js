let articles = require('./articles');
const fs = require('fs');
const helper = {};
helper.random_id = function(){
    return Math.ceil(Math.random()*100);
};

helper.updateArticles=function(){
    fs.writeFileSync('articles.json', JSON.stringify(articles));
};

helper.logger =(url, post_body)=>{
    let data=Object.assign({}, post_body, { url:url, reqDate:helper.dateFormater() });
    const logPath ='log.json';

/*
     fs.stat(logPath, (err, stat)=>{
            if(err){
                fs.writeFile(logPath, JSON.stringify([data]));                
            }
            else{
                fs.readFile(logPath, (err, val) => {
                    let log = JSON.parse(Buffer.from(val).toString());
					log.push(data);
					fs.writeFile(logPath, JSON.stringify(log), ()=>{});
                });
            }
        });*/
};

helper.dateFormater = function(){
    const date = new Date();
    return `Date: ${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ` +
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
module.exports = helper;