let user = localStorage.name;
let email = localStorage.email;

$('.userInfo').append(`Hello, ${user}!<br> Here are your achievements!`);

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
        $('.badges').append(`<div class="profile_row"><img src="./images/worm.jpg"  height="50px" width="50px">  <span>Written your First Post!</span><br></div>`);

    }

    if (data.length >=5){
        $('.badges').append(`<div class="profile_row"><img src="./images/duck.png" height="50px" width="50px">  <span>Written Five Posts!</span><br></div>`);
    }

    if (data.length >=10){
        $('.badges').append(`<div class="profile_row"><img src="./images/penguin.gif" height="50px" width="50px">  <span>Written Ten Posts!</span><br></div>`);
    }

    if (data.length >= 25){
        $('.badges').append(`<div class="profile_row"><img src="./images/tiger.png" height="50px" width="50px">  <span>Written Twenty-Five Posts</span><br></div>`);
    }

    if (data.length >= 50){
        $('.badges').append(`<div class="profile_row"><img src="./images/snoopy.png" height="50px" width="50px">  <span>Written Fifty Posts!</span><br></div>`);
    }

    if (data.length >= 75){
        $('.badges').append(`<div class="profile_row"><img src="./images/dorothy.png" height="50px" width="50px">  <span>Written Seventy-Five Posts!</span><br></div>`);
    }

    if (data.length >= 100){
        $('.badges').append(`<div class="profile_row"><img src="./images/top_hat.png" height="50px" width="50px">  <span>Written One Hundred Posts!</span><br></div>`);
    }

}



$(getDataApi);