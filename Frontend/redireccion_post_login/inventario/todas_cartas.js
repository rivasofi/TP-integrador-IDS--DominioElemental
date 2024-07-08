document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': [
            { numero: 4, nombre: 'SZA', descripcion: '' },
            { numero: 5, nombre: 'Sabrina Carpenter', descripcion: 'Polly Pocket' },
            { numero: 6, nombre: 'Fito Paez',descripcion: '' },
            { numero: 8, nombre: 'Melanie Martinez',descripcion: '' },
            { numero: 9, nombre: 'Mariah Carey',descripcion: '' },
            { numero: 14, nombre: 'ITZY', descripcion:'el mejor GG'},
            { numero: 18, nombre: 'Milky Dolly',descripcion: 'no vendan mi pais. me vendo yo' },
            { numero: 30, nombre: 'Firefox',descripcion: '' },
            { numero: 36, nombre: 'Gretchen Wieners',descripcion:'"Thats why her hair is so big. Its secrets."' },
            { numero: 43, nombre: 'Gandalf',descripcion: '' },
            { numero: 47, nombre: 'Zuko',descripcion: '' },
            { numero: 48, nombre: 'Azula',descripcion: '' },
            { numero: 57, nombre: 'Iroh',descripcion: '' },
        ],
        'cartas_nieve': [
            { numero: 2, nombre: 'Lady Gaga',descripcion: '' },
            { numero: 3, nombre: 'Leo Mattioli',descripcion: '' },
            { numero: 10, nombre: 'Duki',descripcion:'toy que goteo' },
            { numero: 16, nombre: 'Enano Bostero',descripcion:'estado: haciendo un asado' },
            { numero: 17, nombre: 'Ricardo Fort',descripcion:'Yo no manejo el rating. Yo manejo un Rolls-Royce' },
            { numero: 19, nombre: 'Anto Pane', descripcion: 'NOOOO YO SOY ARIANA GRANDE' },
            { numero: 21, nombre: 'Mirtha Legrand',descripcion: 'por que mataste a tus padres?' },
            { numero: 26, nombre: 'Linux',descripcion: 'sudo apt' },
            { numero: 33, nombre: 'Barbie',descripcion: '' },
            { numero: 35, nombre: 'Cady Heron',descripcion: 'El límite no existe' },
            { numero: 39, nombre: 'Elle Woods',descripcion:'what, like its hard?' },
            { numero: 41, nombre: 'Thranduil',descripcion: '' },
            { numero: 60, nombre: 'Laika',descripcion: '' },
            { numero: 63, nombre: 'Appa',descripcion: '' },
                ],
        'cartas_tierra': [
            { numero: 7, nombre: 'Olivia Rodrigo',descripcion: '' },
            { numero: 12, nombre: 'Tini', descripcion: 'Estado: Bano de la BRESH' },
            { numero: 15, nombre: 'Rose',descripcion: '' },
            { numero: 28, nombre: 'Octocat',descripcion: '' },
            { numero: 29, nombre: 'GNU',descripcion: '' },
            { numero: 44, nombre: 'Naruto', descripcion: 'komedasai arigato' },
            { numero: 45, nombre: 'Sakura',descripcion: '' },
            { numero: 51, nombre: 'Suki',descripcion: '' },
            { numero: 52, nombre: 'Toph',descripcion: '' },
            { numero: 58, nombre: 'Steve',descripcion: '' },
            { numero: 59, nombre: 'Creeper', descripcion: 'tsss' },
            { numero: 61, nombre: 'Dolly',descripcion: '' },
            { numero: 62, nombre: 'Aang',descripcion: '' },
            { numero: 64, nombre: 'Momo',descripcion:'chirp chirp'},
        ],
        'cartas_agua': [
            { numero: 1, nombre: 'Emilia Mernes',descripcion:'los brillos en los ojos ahora son la tendencia' },
            { numero: 11, nombre: 'Nicki Nicole',descripcion: '' },
            { numero: 13, nombre: 'Jennie',descripcion:'anyehagosaema'},
            { numero: 20, nombre: 'Moria',descripcion:'como nos vamos a pelear, somos mujeres del espectaculo' },
            { numero: 22, nombre: 'Capusotto',descripcion: '' },
            { numero: 23, nombre: 'Pulpo Paul',descripcion: '' },
            { numero: 27, nombre: 'Clippy',descripcion:'click click'},
            { numero: 31, nombre: 'Docker',descripcion:'*ruido de ballena*' },
            { numero: 32, nombre: 'Nessie SQL',descripcion:'que no soy el monstruo del lagonnes' },
            { numero: 34, nombre: 'Regina George',descripcion:'Sé que es una retardada social y rara, pero es mi amiga' },
            { numero: 37, nombre: 'Karen Smith',descripcion:'Im a mouse duh' },
            { numero: 38, nombre: 'Janis',descripcion:'es una golfa barata come porquería que arruinó mi vida'},
            { numero: 40, nombre: 'Cher',descripcion:'As if!'},
            { numero: 42, nombre: 'Legolas',descripcion: '' },
            { numero: 49, nombre: 'Katara',descripcion: '' },
            { numero: 50, nombre: 'Sokka',descripcion: '' },
            { numero: 54, nombre: 'Yue',descripcion: '' },
            { numero: 55, nombre: 'Korra',descripcion: '' },
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
            textoHover.innerHTML = `<span>${carta.nombre}</span><br><p>${carta.descripcion}</p>`;
            
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
