document.addEventListener('DOMContentLoaded', function() {
    if(!getToken()) {
        window.location.href = 'login.html';
    }

    var logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
})

function getToken(){
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    return  localstorage_user.token
}