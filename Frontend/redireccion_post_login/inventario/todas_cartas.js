document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': [
            { numero: 4, nombre: 'SZA' },
            { numero: 5, nombre: 'Sabrina Carpenter' },
            { numero: 6, nombre: 'Fito Paez' },
            { numero: 8, nombre: 'Melanie Martinez' },
            { numero: 9, nombre: 'Mariah Carey' },
            { numero: 14, nombre: 'ITZY' },
            { numero: 18, nombre: 'Milky Dolly' },
            { numero: 30, nombre: 'Firefox' },
            { numero: 36, nombre: 'Gretchen Wieners' },
            { numero: 43, nombre: 'Gandalf' },
            { numero: 47, nombre: 'Zuko' },
            { numero: 48, nombre: 'Azula' },
            { numero: 57, nombre: 'Iroh' },
        ],
        'cartas_nieve': [
            { numero: 2, nombre: 'Lady Gaga' },
            { numero: 3, nombre: 'Leo Mattioli' },
            { numero: 10, nombre: 'Duki' },
            { numero: 16, nombre: 'Enano Bostero' },
            { numero: 17, nombre: 'Ricardo Fort' },
            { numero: 19, nombre: 'Anto Pane' },
            { numero: 21, nombre: 'Mirtha Legrand' },
            { numero: 26, nombre: 'Linux' },
            { numero: 33, nombre: 'Barbie' },
            { numero: 35, nombre: 'Cady Heron' },
            { numero: 39, nombre: 'Elle Woods' },
            { numero: 41, nombre: 'Thranduil' },
            { numero: 60, nombre: 'Laika' },
            { numero: 63, nombre: 'Appa' },
                ],
        'cartas_tierra': [
            { numero: 7, nombre: 'Olivia Rodrigo' },
            { numero: 12, nombre: 'Tini' },
            { numero: 15, nombre: 'Rose' },
            { numero: 28, nombre: 'Octocat' },
            { numero: 29, nombre: 'GNU' },
            { numero: 44, nombre: 'Naruto' },
            { numero: 45, nombre: 'Sakura' },
            { numero: 51, nombre: 'Suki' },
            { numero: 52, nombre: 'Toph' },
            { numero: 58, nombre: 'Steve' },
            { numero: 59, nombre: 'Creeper' },
            { numero: 61, nombre: 'Dolly' },
            { numero: 62, nombre: 'Aang' },
            { numero: 64, nombre: 'Momo' },
        ],
        'cartas_agua': [
            { numero: 1, nombre: 'Emilia Mernes' },
            { numero: 11, nombre: 'Nicki Nicole' },
            { numero: 13, nombre: 'Jennie' },
            { numero: 20, nombre: 'Moria' },
            { numero: 22, nombre: 'Capusotto' },
            { numero: 23, nombre: 'Pulpo Paul' },
            { numero: 27, nombre: 'Clippy' },
            { numero: 31, nombre: 'Docker' },
            { numero: 32, nombre: 'Nessie SQL' },
            { numero: 34, nombre: 'Regina George' },
            { numero: 37, nombre: 'Karen Smith' },
            { numero: 38, nombre: 'Janis' },
            { numero: 40, nombre: 'Cher' },
            { numero: 42, nombre: 'Legolas' },
            { numero: 49, nombre: 'Katara' },
            { numero: 50, nombre: 'Sokka' },
            { numero: 54, nombre: 'Yue' },
            { numero: 55, nombre: 'Korra' },
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
