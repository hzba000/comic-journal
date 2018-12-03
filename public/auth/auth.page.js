//HTTP utility module handles our AJAX requests
//CACHE utility module handles our storage of information
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

//When you submit the sign-up or login form, it will execute these functions...
function onPageLoad() {
    $('#sign-up-form').submit(onSignUpSubmit);
    $('#login-form').submit(onLoginSubmit);
};

//Captures user input and utilizes imported HTTP module function for sign up and validation of user
function onSignUpSubmit(event) {
    event.preventDefault();

    const userData = {
        name: $('#name-txt').val(),
        email: $('#email-txt').val(),
        username: $('#username-txt').val(),
        password: $('#password-txt').val()
    };

    HTTP.signupUser({
        userData,
        onSuccess: user => {
            alert(`User "${user.username}" created, you may now log in.`);
            window.open('/auth/login.html', '_self');
        },
        onError: err => {
            if(err.responseJSON.error.details != undefined){
                alert(`Your username and password must be at least 9 characters`);
            }
            else{
                alert(`This username is taken, try another username!`);
            }
        }
    });
};

//Captures user input and utilizes imported HTTP module function for login and validation of user
function onLoginSubmit(event) {
    event.preventDefault();

    const userData = {
        username: $('#username-txt').val(),
        password: $('#password-txt').val()
    };

    HTTP.loginUser({
        userData,
        onSuccess: response => {
            const authenticatedUser = response.user;
            authenticatedUser.jwtToken = response.jwtToken;
            CACHE.saveAuthenticatedUserIntoCache(authenticatedUser);
            alert('Login succesful, please use site navigation for best results!');
            window.open('../dailycomicpage.html', '_self');
        },
        onError: err => {
            alert('Incorrect username or password. Please try again.');
        }
    });
};