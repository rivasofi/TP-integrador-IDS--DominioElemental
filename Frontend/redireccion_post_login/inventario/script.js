const BACKEND_URL = 'https://dominio-backend.onrender.com';
document.addEventListener('DOMContentLoaded', function () {
    const cartas_por_pag = 14;
    const contenedor_controles = document.querySelector('.controles_invent');
    let lugar_actual = 0;
    let total_paginas = 0;
    let cartas = [];

    fetch(`${BACKEND_URL}/cartas_usuario`)
        .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            contenedor_controles.classList.add('ocultado');
            alert('¡Hola! Parece que no tenes cartas disponibles. Dirigite a la tienda para abrir tus primeros sobres');

        } else {
            cartas = data;
            total_paginas = Math.ceil(cartas.length / cartas_por_pag);
            mostrar_cartas(lugar_actual);
        }
    })
        .catch(error => console.error('Error al obtener las cartas del usuario:', error));

    const contenedor_cartas = document.querySelector('.contenedor_cartas');

    function mostrar_cartas(page) {
        contenedor_cartas.innerHTML = '';

        const start = page * cartas_por_pag;
        const end = Math.min(start + cartas_por_pag, cartas.length)
        const cartas_pagina = cartas.slice(start, end);

        cartas_pagina.forEach(carta => {
            const carta_div = document.createElement('div');
            carta_div.classList.add('carta');

            const path_img = `../../recursos_multimedia/Cartas/cartas_${carta.elemento}/frente/${carta.id}.png`;
            const carta_img = document.createElement('img');
            carta_img.src = path_img;
            carta_img.alt = `${carta.nombre} - ${carta.elemento}`;

            const carta_info = document.createElement('div');
            carta_info.classList.add('carta_info');
            carta_info.innerHTML = `
                    <h3>${carta.nombre}</h3>
                `;

            carta_div.appendChild(carta_img);
            carta_div.appendChild(carta_info);
            contenedor_cartas.appendChild(carta_div);
        });
    }

    window.cambiar_lugar = function (direccion) {
        lugar_actual += direccion;
        if (lugar_actual < 0) {
            lugar_actual = 0;
        } else if (lugar_actual >= total_paginas) {
            lugar_actual = total_paginas - 1;
        }
        mostrar_cartas(lugar_actual);
    };

    const slides = document.querySelectorAll('.slide');
    const total_slides = slides.length;
    let slide_actual = 0;

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
        if (slide_actual === total_slides - 1) {
            ocultar_presentacion();
            return;
        }
        slide_actual = (slide_actual + 1) % total_slides;
        mostrar_slide(slide_actual);
    }

    function anterior_slide() {
        if (slide_actual === 0) {
            return;
        }
        slide_actual = (slide_actual - 1 + total_slides) % total_slides;
        mostrar_slide(slide_actual);
    }

    document.getElementById('boton_siguiente').addEventListener('click', function () {
        siguiente_slide();
    });

    document.getElementById('boton_anterior').addEventListener('click', function () {
        anterior_slide();
    });

    function ocultar_presentacion() {
        const presentacion_cont = document.querySelector('.presentacion_contenedor');
        presentacion_cont.classList.add('oculto');
        presentacion_cont.style.animation = 'desvanecer 0.3s ease forwards';
        sessionStorage.setItem('presentacion_vista', 'true');
    }

    document.getElementById('boton_saltar').addEventListener('click', function () {
        ocultar_presentacion();
    });

    if (!sessionStorage.getItem('presentacion_vista')) {
        const presentacion_cont = document.querySelector('.presentacion_contenedor');
        presentacion_cont.classList.remove('oculto');
        presentacion_cont.classList.add('visible');
    }
});