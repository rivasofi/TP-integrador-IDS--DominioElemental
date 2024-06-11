document.getElementById('form-open').addEventListener('click', function () {
    var loginForm = document.querySelector('.login_form');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
    }
});
