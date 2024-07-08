document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': [
            { numero: 4, nombre: 'SZA' },
            { numero: 5, nombre: '' },
        ],
        'cartas_nieve': [
            { numero: 2, nombre: 'Nombre Personalizado' },
            { numero: 3, nombre: 'Nombre Personalizado' },
                ],
        'cartas_tierra': [
            { numero: 7, nombre: 'Nombre Personalizado' },
            { numero: 12, nombre: 'Nombre Personalizado' },
        ],
        'cartas_agua': [
            { numero: 1, nombre: 'Nombre Personalizado' },
            { numero: 11, nombre: 'Nombre Personalizado' },

        ]
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

        cartas.forEach((carta) => {
            const contenedor = document.createElement('div');
            contenedor.classList.add('carta');

            const img = document.createElement('img');
            img.src = `${base_path}${carpeta_actual}/frente/${carta.numero}.png`;
            img.alt = `${carpeta_actual} ${carta.numero}`;

            const textoHover = document.createElement('div');
            textoHover.classList.add('texto-hover');
            textoHover.innerHTML = `<span>${carta.nombre}</span><br><p>Descripción de la carta ${carta.numero}</p>`;
            switch (carpeta_actual) {
                case 'cartas_fuego':
                    textoHover.classList.add('cambio-color-fuego');
                    break;
                case 'cartas_nieve':
                    textoHover.classList.add('cambio-color-hielo');
                    break;
                case 'cartas_tierra':
                    textoHover.classList.add('cambio-color-tierra');
                    break;
                case 'cartas_agua':
                    textoHover.classList.add('cambio-color-agua');
                    break;
                default:
                    textoHover.classList.add('cambio-color-default');
            }

            contenedor.appendChild(img);
            contenedor.appendChild(textoHover);
            grid_img.appendChild(contenedor);
        });

        if (lugar_actual === 3) {
            boton_anterior.classList.add('ultima_slide');
            boton_siguiente.classList.add('ultima_slide');
        } else {
            boton_anterior.classList.remove('ultima_slide');
            boton_siguiente.classList.remove('ultima_slide');
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
