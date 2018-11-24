function deleteAuthenticatedUserFromCache() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
}

//Delete user information from local storage when redirected to index page
$(deleteAuthenticatedUserFromCache);

