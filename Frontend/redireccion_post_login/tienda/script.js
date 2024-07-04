document.body.addEventListener('click', function () {
    reproducir_audio();
});

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

function redireccionar(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item');

    const hoverSound = document.getElementById('hover-sound');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    
});