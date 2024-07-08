document.addEventListener('DOMContentLoaded', () => {
    
    let backgrounds = [
        'url(recursos_multimedia/imagenes_login/login_2.png)',
        'url(recursos_multimedia/imagenes_login/login_3.png)',
        'url(recursos_multimedia/imagenes_login/login_4.png)',
        'url(recursos_multimedia/imagenes_login/login_5.png)',
        'url(recursos_multimedia/imagenes_login/login_6.png)',
        'url(recursos_multimedia/imagenes_login/login_7.png)',
        'url(recursos_multimedia/imagenes_login/login_8.png)',
        'url(recursos_multimedia/imagenes_login/login_9.png)',
        'url(recursos_multimedia/imagenes_login/login_10.png)',
        'url(recursos_multimedia/imagenes_login/login_11.png)',
        'url(recursos_multimedia/imagenes_login/login_12.png)',
    ];

    precargar_imagenes(backgrounds);

    function randomizar_fondos(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    randomizar_fondos(backgrounds);

    let fondo_actual = 0;

    function cambiar_fondo() {
        fondo_actual = (fondo_actual + 1) % backgrounds.length;
        document.body.style.backgroundImage = backgrounds[fondo_actual];
    }

    setTimeout(() => {
        document.body.style.backgroundImage = 'url(recursos_multimedia/login.png)';
    }, 100);

    setInterval(cambiar_fondo, 4000);
});

document.body.addEventListener('click', function () {
    reproducir_audio();
});

document.getElementById('form-open').addEventListener('click', function () {
    var formulario_login = document.querySelector('.login_form');

    if (!formulario_login.classList.contains('show')) {
        formulario_login.classList.remove('inactive');
        formulario_login.classList.add('show');
        habilitar_elementos_formulario();
    } else {
        formulario_login.classList.remove('show');
        formulario_login.classList.add('inactive');
    }
});

document.getElementById('cerrar_login').addEventListener('click', function () {
    var formulario_login = document.querySelector('.login_form');

    formulario_login.classList.remove('show');
    formulario_login.classList.add('inactive');
});

document.getElementById('toggle_contrasena').addEventListener('click', function () {
    var campo_contrasena = document.getElementById('passwordField');
    if (campo_contrasena.type === "password") {
        campo_contrasena.type = "text";
    } else {
        campo_contrasena.type = "password";
    }
});

function habilitar_elementos_formulario() {
    var inputs = document.querySelectorAll('.login_form input');
    var botones = document.querySelectorAll('.login_form button');
    var enlaces = document.querySelectorAll('.login_form a');

    inputs.forEach(input => input.disabled = false);
    botones.forEach(button => button.disabled = false);
    enlaces.forEach(enlace => enlace.style.pointerEvents = 'auto');
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

function precargar_imagenes(imagenes) {
    imagenes.forEach(function (imagen) {
        var img = new Image();
        img.src = imagen.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    });
}
