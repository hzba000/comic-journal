let user = localStorage.name;
let email = localStorage.email;

$('.userInfo').append(`Hello, ${user}!<br> Here are your achievements!`);

function getDataApi() {
    $.ajax({
        type: 'GET',
        url: `/api/comic`,
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.jwtToken}`);
        },
        success: displayDataApi,
        error: err => {
            if (onError) {
                onError(err);
            }
        }
    });
}

function displayDataApi(data){
    if(data.length===0){$('.badges').append(`<h2>Write some posts to start getting achievements!</h2><div><img src="./images/question_stick.png" alt="question-stick"></div>`);}
    if (data.length > 0){$('.badges').append(`<div class="profile_row"><img src="./images/worm.jpg" alt="worm-award" height="50px" width="50px">  <span>Written your First Post!</span><br></div>`);}
    if (data.length >=5){$('.badges').append(`<div class="profile_row"><img src="./images/duck.png" alt="duck-award"height="50px" width="50px">  <span>Written Five Posts!</span><br></div>`);}
    if (data.length >=10){$('.badges').append(`<div class="profile_row"><img src="./images/penguin.gif" alt="penguin-award"height="50px" width="50px">  <span>Written Ten Posts!</span><br></div>`);}
    if (data.length >= 25){$('.badges').append(`<div class="profile_row"><img src="./images/tiger.png" alt="tiger-award" height="50px" width="50px">  <span>Written Twenty-Five Posts</span><br></div>`);}
    if (data.length >= 50){$('.badges').append(`<div class="profile_row"><img src="./images/snoopy.png" alt="snoopy-award" height="50px" width="50px">  <span>Written Fifty Posts!</span><br></div>`);}
    if (data.length >= 75){$('.badges').append(`<div class="profile_row"><img src="./images/dorothy.png" alt="dorothy-award" height="50px" width="50px">  <span>Written Seventy-Five Posts!</span><br></div>`);}
    if (data.length >= 100){$('.badges').append(`<div class="profile_row"><img src="./images/top_hat.png" alt="top-hat-award" height="50px" width="50px">  <span>Written One Hundred Posts!</span><br></div>`);}
}

$(getDataApi);