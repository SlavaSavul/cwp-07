let sortValue, sortOrder;
let current_page = 1;

window.onload = function () {
    load_articles(JSON.stringify({
            "page": 1,
            "limit": 5,
        "sortField":"id",
        "sortOrder": "asc"}
        ));
    sortValue = document.getElementById("sortValue");
    sortOrder = document.getElementById("sortOrder");
   
    $( "#loadNewButton" ).click(function() {
        onChange();
    });
    $('#show_paginator').on('page', (event, num) =>{
        current_page = num;
        load_articles(JSON.stringify({
            "page": num,
            "limit": 5,
            "sortField": sortValue.options[sortValue.selectedIndex].value,
            "sortOrder": sortOrder.options[sortOrder.selectedIndex].value}
        ));
    });
};


function onChange(){
    $("#articles").html = "";
    current_page = 1;
    load_articles(JSON.stringify({
        "page": 1,
        "limit": 5,
        "sortField": sortValue.options[sortValue.selectedIndex].value.toString(),
        "sortOrder": sortOrder.options[sortOrder.selectedIndex].value.toString()}
    ));
}

function load_articles(myData){
    $.ajax({
        type: "POST",
        url: "/api/articles/readAll",
        data: myData,
        success: function (response) {
            $("#articles").html(render_articles(response.items));
            $('#show_paginator').bootpag({
                total: response.pages,
                page: current_page,
                maxVisible: response.pages
            })
        },
        error: function (error) {
            alert("Eror = " + error.toString());
        }
    });
}

function render_articles(items){
    let result = '';
    items.forEach(function(item){
        
result +=`  <div class="bs-callout bs-callout-danger">
                        <div class="text-cut"> <h4> <p> ${item.title|| ""} </p></h4></div>
                        <div style="width:100%">
                            <div style="display: inline-block;">
                                <span class="text-muted text-sm"> <i class="fa  fa-lg"></i>${item.id} - ${item.date} </span>
                            </div>
                            <div style="display: inline-block; "></div>
                        </div>
                        <div >  ${item.text}</div>
                        <div >  ${item.author}</div>
                    </div>`;
    });
    return result;
}
