document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': 25,
        'cartas_nieve': 27,
        'cartas_tierra': 27,
        'cartas_agua': 35
    };

    const base_path = '../../recursos_multimedia/Cartas/';
    const grid_img = document.getElementById('grid_imagenes');
    const max_por_lugar = 12;
    let lugar_actual = 0;

    function cargar_imagenes(carpeta_actual) {
        grid_img.innerHTML = '';

        const cant_imagenes = carpetas[carpeta_actual];
        const boton_anterior = document.getElementById('boton_anterior');
        const boton_siguiente = document.getElementById('boton_siguiente');

        for (let i = 1; i <= cant_imagenes; i += 2) {
            const img = document.createElement('img');
            img.src = `${base_path}${carpeta_actual}/frente/${i}.png`;
            img.alt = `${carpeta_actual} ${i}`;


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
        }
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
