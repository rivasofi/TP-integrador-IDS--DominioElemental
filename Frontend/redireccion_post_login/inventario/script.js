document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const total_slides = slides.length;
    let current_slide = 0;

    function mostrar_slide(index) {
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('activa');
            } else {
                slide.classList.remove('activa');
            }
        });
    }

    function siguiente_slide() {
        if (current_slide === total_slides - 1) {
            ocultar_presentacion();
            return;
        }
        current_slide = (current_slide + 1) % total_slides;
        mostrar_slide(current_slide);
    }

    function anterior_slide() {
        if (current_slide === 0) {
            return;
        }
        current_slide = (current_slide - 1 + total_slides) % total_slides;
        mostrar_slide(current_slide);
    }

    document.getElementById('boton_siguiente').addEventListener('click', function () {
        siguiente_slide();
    });

    document.getElementById('boton_anterior').addEventListener('click', function () {
        anterior_slide();
    });

    function ocultar_presentacion() {
        const presentacionContenedor = document.querySelector('.presentacion_contenedor');
        presentacionContenedor.classList.add('oculto');
        presentacionContenedor.style.animation = 'desvanecer 0.3s ease forwards';
        sessionStorage.setItem('presentacion_vista', 'true');
    }

    document.getElementById('boton_saltar').addEventListener('click', function () {
        ocultar_presentacion();
    });

    if (!sessionStorage.getItem('presentacion_vista')) {
        const presentacionContenedor = document.querySelector('.presentacion_contenedor');
        presentacionContenedor.classList.remove('oculto');
        presentacionContenedor.classList.add('visible');
    }
});

function mostrar_banner() {
    const tituloCartas = document.getElementById('titulo-cartas');
}

function ocultar_banner() {
    const tituloCartas = document.getElementById('titulo-cartas');
}