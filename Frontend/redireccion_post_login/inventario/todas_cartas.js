document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': [4, 5, 6, 8, 9, 14, 18, 30, 36, 43, 47, 48, 57],
        'cartas_nieve': [2, 3, 10, 16, 17, 19, 21, 26, 33, 35, 39, 41, 60, 63],
        'cartas_tierra': [7, 12, 15, 28, 29, 44, 45, 51, 52, 58, 59, 61, 62, 64],
        'cartas_agua': [1, 11, 13, 20, 22, 23, 27, 31, 32, 34, 37, 38, 40, 42, 49, 50, 54, 55]
    };

    const base_path = '../../recursos_multimedia/Cartas/';
    const grid_img = document.getElementById('grid_imagenes');
    const max_por_lugar = 12;
    let lugar_actual = 0;

    function cargar_imagenes(carpeta_actual) {
        grid_img.innerHTML = '';

        const cartas = carpetas[carpeta_actual];
        const boton_anterior = document.getElementById('boton_anterior');
        const boton_siguiente = document.getElementById('boton_siguiente');

        cartas.forEach((numero_carta, index) => {
            const img = document.createElement('img');
            img.src = `${base_path}${carpeta_actual}/frente/${numero_carta}.png`;
            img.alt = `${carpeta_actual} ${numero_carta}`;

            if (lugar_actual === 3) {
                img.classList.add('imagen-chica');
                boton_anterior.classList.add('ultima_slide');
                boton_siguiente.classList.add('ultima_slide');
            } else {
                img.classList.remove('imagen-chica');
                boton_anterior.classList.remove('ultima_slide');
                boton_siguiente.classList.remove('ultima_slide');
            }

            grid_img.appendChild(img);
        });
    }

    function cambiar_lugar(direccion) {
        lugar_actual += direccion;

        const carpetas_keys = Object.keys(carpetas);
        if (lugar_actual < 0) {
            lugar_actual = 0;
        } else if (lugar_actual >= carpetas_keys.length) {
            lugar_actual = carpetas_keys.length - 1;
        }

        const carpeta_actual = carpetas_keys[lugar_actual];
        cargar_imagenes(carpeta_actual);
    }

    cargar_imagenes(Object.keys(carpetas)[0]);

    document.getElementById('boton_anterior').addEventListener('click', function () {
        cambiar_lugar(-1);
    });

    document.getElementById('boton_siguiente').addEventListener('click', function () {
        cambiar_lugar(1);
    });
});
