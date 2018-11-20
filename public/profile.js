let user = localStorage.name;
let email = localStorage.email;

$('.userInfo').append(`Hello, ${user}! Here are your achievements!`);

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
    console.log(data.length);
    if (data.length > 0){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written your First Post!</span><br>`);

    }

    if (data.length >=5){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written Five Posts!</span><br>`);
    }

    if (data.length >=10){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written Ten Posts!</span><br>`);
    }

    if (data.length >= 25){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written Twenty-Five Posts</span><br>`);
    }

    if (data.length >= 50){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written Fifty Posts!</span><br>`);
    }

    if (data.length >= 75){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written Seventy-Five Posts!</span><br>`);
    }

    if (data.length >= 100){
        $('.badges').append(`<img src="green_check.jpg" height="50px" width="50px">  <span>Written 100 Posts!</span><br>`);
    }

}



$(getDataApi);