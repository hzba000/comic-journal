
  let userData = null;

  
  function getDataApi() {
    $.ajax({
        type: 'GET',
        url: `/api/note`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
        },
        success: displayDataApi,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function displayDataApi(data){
    function compare(a,b){
        if (a.createDate < b.createDate){
            return -1;
        }
        if(a.createDate > b.createDate){
            return 1;
        }
        return 0;
    }

    data.sort(compare);

    $('.listViewSubmit').click(function(){
        for(i=0; i<data.length; i++){
            if(data[i].content.length > 120){
            $("main").append(`<div><img src='${data[i].title}'><span>${data[i].content.substring(0,30)+'...'}</span></div>`)
            }
            else{
            $("main").append(`<div><img src='${data[i].title}'><span>${data[i].content}</span></div>`)
            }
        }
    })}





$(getDataApi);
