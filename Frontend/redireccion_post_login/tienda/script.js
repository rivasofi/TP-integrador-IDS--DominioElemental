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
document.addEventListener('DOMContentLoaded', function () {
    const elem_grande = document.querySelector('.elem_grande img');
    const imagenes = [
        "../../recursos_multimedia/Infografía salud mental orgánico creativo rosado y blanco.png",
        "../../recursos_multimedia/icono_conra.jpeg",
    ];

    let index = 0;

    function cambiar_foto() {
        elem_grande.src = imagenes[index];

        index++;
        if (index >= imagenes.length) {
            index = 0;
        }
    }
    cambiar_foto();
    setInterval(cambiar_foto, 5000);
});
