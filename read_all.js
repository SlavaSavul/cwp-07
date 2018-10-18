let articles = require('./articles');
let newArticles = [];
let Payload;
let modify = {
    'sortField': sort,
    'page': paginate,
    'includeDeps': includeComments
};


module.exports = function readAll(req, res, payload, cb) {
    newArticles = articles.slice();
    Payload = payload;
    CheckDefaultValue();
	for(let key in payload){
	   if(modify[key] != undefined){
	            modify[key](payload[key]);
	    }
	}
	cb(null, Result(),'application/json');    
};

function CheckDefaultValue(){
	if(Payload['sortField']==undefined){
		Payload['sortField']="date";
		Payload['sortOrder']="desc";
	}
	if(Payload['includeDeps']==undefined){
		Payload['includeDeps']=false;
	}

}

function Result(){
    return {"count": articles.length,
    		"pages":  Math.ceil(articles.length/getLimit()),
        	"page": getPage(),
        	"limit": getLimit(), 
        	"items": newArticles};
}

function sort(value) {
    if(Payload.sortOrder ==='asc'){
        compareValue(value, 1);
    }else{
        compareValue(value, -1);
    }
}

function compareValue(value, order){
    newArticles.sort( (a, b)=>{
    	return (b[value] - a[value])*order;
    });
}

function includeComments(value){
    if (value === "false") {
        newArticles = newArticles.map((element) => {
            delete element.comments;
            return Object.assign({}, element);
        });
    }
}

function paginate(){
    let correctlimit = getLimit();
    newArticles = newArticles.splice((getPage(Payload) - 1) * correctlimit, correctlimit);
}

function getPage(){
    return Payload.page || 1;
}

function getLimit(){
    return Payload.limit || 3;
}

