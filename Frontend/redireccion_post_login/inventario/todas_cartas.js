document.addEventListener('DOMContentLoaded', function () {
    const carpetas = {
        'cartas_fuego': [
            { numero: 4, nombre: 'SZA', descripcion: 'Amo mi propio caos' },
            { numero: 5, nombre: 'Sabrina Carpenter', descripcion: 'Polly Pocket' },
            { numero: 6, nombre: 'Fito Paez', descripcion: 'Ellos solos pueden más que el amor' },
            { numero: 8, nombre: 'Melanie Martinez', descripcion: 'Crybaby' },
            { numero: 9, nombre: 'Mariah Carey', descripcion: 'All I want for christmas is you' },
            { numero: 14, nombre: 'ITZY', descripcion: 'El mejor GG' },
            { numero: 18, nombre: 'Milky Dolly', descripcion: 'No vendan mi pais, me vendo yo' },
            { numero: 30, nombre: 'Firefox', descripcion: '' },
            { numero: 36, nombre: 'Gretchen Wieners', descripcion: '"Thats why her hair is so big. Its full of secrets."' },
            { numero: 43, nombre: 'Gandalf', descripcion: 'A menudo el odio se lastima a sí mismo' },
            { numero: 47, nombre: 'Zuko', descripcion: 'En la oscuridad, la esperanza es algo que te das a ti mismo' },
            { numero: 48, nombre: 'Azula', descripcion: 'Mi propia madre pensó que yo era un monstruo' },
            { numero: 57, nombre: 'Iroh', descripcion: 'La vida sucede dondequiera que estés, ya sea que lo logres o no' },
        ],
        'cartas_nieve': [
            { numero: 2, nombre: 'Lady Gaga', descripcion: 'Born this way' },
            { numero: 3, nombre: 'Leo Mattioli', descripcion: 'Lloraras mas de diez veces por amor' },
            { numero: 10, nombre: 'Duki', descripcion: 'toy que goteo' },
            { numero: 16, nombre: 'Enano Bostero', descripcion: '¿Le falta fuego?' },
            { numero: 17, nombre: 'Ricardo Fort', descripcion: 'Yo no manejo el rating. Yo manejo un Rolls-Royce' },
            { numero: 19, nombre: 'Anto Pane', descripcion: 'NOOOO YO SOY ARIANA GRANDE' },
            { numero: 21, nombre: 'Mirtha Legrand', descripcion: '¿Por qué mataste a tus padres?' },
            { numero: 26, nombre: 'Linux', descripcion: 'sudo apt' },
            { numero: 33, nombre: 'Barbie', descripcion: 'Every night is girls night' },
            { numero: 35, nombre: 'Cady Heron', descripcion: 'El límite no existe' },
            { numero: 39, nombre: 'Elle Woods', descripcion: 'What, like its hard?' },
            { numero: 41, nombre: 'Thranduil', descripcion: 'Con el tiempo, todas las cosas inmundas surgen' },
            { numero: 24, nombre: 'Laika', descripcion: '' },
            { numero: 63, nombre: 'Appa', descripcion: '¡Yip yip!' },
        ],
        'cartas_tierra': [
            { numero: 7, nombre: 'Olivia Rodrigo', descripcion: 'I made the jokes you tell to her when she is with you' },
            { numero: 12, nombre: 'Tini', descripcion: 'La triple T' },
            { numero: 15, nombre: 'Rose', descripcion: 'Look at you, now look at me' },
            { numero: 28, nombre: 'Octocat', descripcion: '' },
            { numero: 29, nombre: 'GNU', descripcion: 'GNU not Unix' },
            { numero: 44, nombre: 'Naruto', descripcion: 'Una vez que cuestionas tus propias creencias, estás acabado' },
            { numero: 45, nombre: 'Sakura', descripcion: '¡Es mejor morir luchando que no hacer nada!' },
            { numero: 51, nombre: 'Suki', descripcion: 'La líder de las Guerreras Kyoshi' },
            { numero: 52, nombre: 'Toph', descripcion: 'Ya he visto suficiente de Ba Sing Sei. ¡Y ni siquiera puedo ver!' },
            { numero: 58, nombre: 'Steve', descripcion: 'Si hay que ser minero' },
            { numero: 59, nombre: 'Creeper', descripcion: 'tsss' },
            { numero: 25, nombre: 'Dolly', descripcion: '' },
            { numero: 62, nombre: 'Aang', descripcion: 'El pasado puede ser un gran maestro' },
            { numero: 64, nombre: 'Momo', descripcion: 'chirp chirp' },
        ],
        'cartas_agua': [
            { numero: 1, nombre: 'Emilia Mernes', descripcion: 'Los brillos en los ojos ahora son la tendencia' },
            { numero: 11, nombre: 'Nicki Nicole', descripcion: 'Mamichula' },
            { numero: 13, nombre: 'Jennie', descripcion: 'Boombayah' },
            { numero: 20, nombre: 'Moria', descripcion: '¿Como nos vamos a pelear? Somos mujeres del espectáculo' },
            { numero: 22, nombre: 'Capusotto', descripcion: 'Yo soy ídolo del rock' },
            { numero: 23, nombre: 'Pulpo Paul', descripcion: 'Anulo mufa' },
            { numero: 27, nombre: 'Clippy', descripcion: 'click click' },
            { numero: 31, nombre: 'Docker', descripcion: '*ruido de ballena*' },
            { numero: 32, nombre: 'Nessie SQL', descripcion: 'que no soy el monstruo del Lago Ness' },
            { numero: 34, nombre: 'Regina George', descripcion: 'Sé que es una retardada social y rara, pero es mi amiga' },
            { numero: 37, nombre: 'Karen Smith', descripcion: 'Im a mouse duh' },
            { numero: 38, nombre: 'Janis', descripcion: 'Es una golfa barata come porquería que arruinó mi vida' },
            { numero: 40, nombre: 'Cher', descripcion: 'As if!' },
            { numero: 42, nombre: 'Legolas', descripcion: 'Un sol rojo sale. Se ha derramado sangre esta noche' },
            { numero: 49, nombre: 'Katara', descripcion: 'El amor es más brillante en la oscuridad' },
            { numero: 50, nombre: 'Sokka', descripcion: '¡Soy muy joven para morir!' },
            { numero: 54, nombre: 'Yue', descripcion: 'El espíritu de la Luna' },
            { numero: 55, nombre: 'Korra', descripcion: 'Soy el Avatar, tienes que lidiar con ello!' },
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
