document.body.addEventListener('click', function () {
    reproducir_audio();
});

document.getElementById('form-open').addEventListener('click', function () {
    var loginForm = document.querySelector('.login_form');
    var banner = document.querySelector('.banner');

    if (!loginForm.classList.contains('show')) {
        loginForm.classList.add('show');
        banner.style.opacity = '0';
        banner.classList.add('hide');
        enable_form_elements();
    } else {
        loginForm.classList.remove('show');
        banner.style.opacity = '1';
        banner.classList.remove('hide');
    }
});

document.getElementById('cerrar_login').addEventListener('click', function () {
    var loginForm = document.querySelector('.login_form');
    var banner = document.querySelector('.banner');

    loginForm.classList.remove('show');
    banner.style.opacity = '1';
    banner.classList.remove('hide');
});

document.getElementById('toggle_contrasena').addEventListener('click', function () {
    var passwordField = document.getElementById('passwordField');
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});

function enable_form_elements() {
    var inputs = document.querySelectorAll('.login_form input');
    var buttons = document.querySelectorAll('.login_form button');
    var links = document.querySelectorAll('.login_form a');

    inputs.forEach(input => input.disabled = false);
    buttons.forEach(button => button.disabled = false);
    links.forEach(link => link.style.pointerEvents = 'auto');
}

function reproducir_audio() {
    var audio = document.getElementById("background-audio");
    audio.play();
}

function mutear_audio() {
    var audio = document.getElementById("background-audio");
    audio.muted = !audio.muted;
    var icono = document.querySelector('.boton_volumen i');

    if (audio.muted) {
        icono.classList.remove('bx-volume-full');
        icono.classList.add('bx-volume-mute');
    } else {
        icono.classList.remove('bx-volume-mute');
        icono.classList.add('bx-volume-full');
    }
}