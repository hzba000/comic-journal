// All these modules are are defined in /public/utilities
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    $('#sign-up-form').submit(onSignUpSubmit);
    $('#login-form').submit(onLoginSubmit);
}

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
            // alert(`${err.responseJSON.error.details[0].message}` || `${err.responseJSON.error}`);

            if(err.responseJSON.error.details != undefined){
                alert(`Your username and password must be at least 9 characters`);
            }
            else{
                alert(`User already exists, please go to login page to sign in`);
            }



            // console.log(err.responseText);
        }
    });
}

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
            alert('Login succesful, redirecting you to homepage ...');
            window.open('../dailycomicpage.html', '_self');
        },
        onError: err => {
            alert('Incorrect username or password. Please try again.');
        }
    });
}