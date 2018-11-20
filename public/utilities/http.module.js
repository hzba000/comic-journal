window.HTTP_MODULE = {
    signupUser,
    loginUser,
};

function signupUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/user',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function loginUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/auth/login',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

