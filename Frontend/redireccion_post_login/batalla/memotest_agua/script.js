function redireccionar(url) {
    window.location.href = url;
}

const datos_quiz = [
    {
        pregunta: "¿Cuál es la etiqueta correcta para definir el título de una página web?",
        opciones: ["<title>", "<header>", "<h1>", "<meta>"],
        respuesta: "<title>"
    },
    {
        pregunta: "¿Qué unidad NO se utiliza para medir el tamaño de las fuentes en CSS?",
        opciones: ["%", "em", "px", "cm"],
        respuesta: "cm"
    },
    {
        pregunta: "¿Qué propiedad CSS se utiliza para definir el ancho de un elemento?",
        opciones: ["height", "width", "size", "depth"],
        respuesta: "width"
    },
    {
        pregunta: "¿Cuál de estos animales es un mamífero marino?",
        opciones: ["Tiburón", "Delfín", "Tortuga marina", "Pulpo"],
        respuesta: "Delfín"
    },
    {
        pregunta: "¿Qué animal es conocido por su capacidad de cambiar de color para camuflarse?",
        opciones: ["Pez payaso", "Camarón mantis", "Pulpo", "Anguila eléctrica"],
        respuesta: "Pulpo"
    },
    {
        pregunta: "¿Cuál de estos animales es un reptil marino?",
        opciones: ["Pez sierra", "Tiburón blanco", "Tortuga marina", "Barracuda"],
        respuesta: "Tortuga marina"
    },
    {
        pregunta: "¿Cuál de los siguientes NO es un editor de texto?",
        opciones: ["vim","emacs","microsoft word","bloc de notas"],
        respuesta: "microsoft word"
    },
    {
        pregunta: "¿Cuál es una posible salida de ls | wc -l ?",
        opciones: ["true","tp1.pdf codigo.c foto.jpg ....","5","-1"],
        respuesta: "5"
    },
    {
        pregunta: "Si quiero listar todos los archivos en un directorio, ¿Qué debo ejecutar?",
        opciones: ["dir","ls","ls -a","dir -all"],
        respuesta: "ls -a"
    },
];

function rand_pregs() {
    for (let i = datos_quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [datos_quiz[i], datos_quiz[j]] = [datos_quiz[j], datos_quiz[i]];
    }
}

let pregunta_actual = 0;
let contador_correctas = 0;
let contador_incorrectas = 0;

function iniciar_juego() {
    rand_pregs();
    mostrar_pregunta();
}

function mostrar_pregunta() {
    const preguntaActual = datos_quiz[pregunta_actual];
    const opciones = preguntaActual.opciones;

    document.getElementById("pregunta").textContent = preguntaActual.pregunta;

    for (let i = 0; i < opciones.length; i++) {
        const opcionLabel = document.getElementById(`opcion_${i + 1}`);
        opcionLabel.textContent = opciones[i];
        opcionLabel.previousElementSibling.value = opciones[i];
    }
}

function verificar_respuesta(respuestaSeleccionada) {
    const preguntaActual = datos_quiz[pregunta_actual];
    if (respuestaSeleccionada === preguntaActual.respuesta) {
        contador_correctas++;
    } else {
        contador_incorrectas++;
    }
    mostrar_siguiente_pregunta();
}

function mostrar_siguiente_pregunta(){
    pregunta_actual++;
    if (pregunta_actual < datos_quiz.length){
        mostrar_pregunta();
    } else {
        mostrar_resultados_finales();
    }
}

function mostrar_resultados_finales() {
    document.getElementById("pregunta").textContent = "TERMINO EL JUEGO";
    document.getElementById("preguntas_form").style.display = "none";
    document.getElementById("resultados").style.display = "block";
    document.getElementById("contador_corr").textContent = contador_correctas;
    document.getElementById("contador_inc").textContent = contador_incorrectas;
    document.getElementById("contador_corr").className = "correcto";
    document.getElementById("contador_inc").className = "incorrecto";
    sonido_fin();
}

document.getElementById("preguntas_form").addEventListener("submit", function(event) {
    event.preventDefault();
    const respuestaSeleccionada = document.querySelector('input[name="rta"]:checked');

    if (respuestaSeleccionada) {
        verificar_respuesta(respuestaSeleccionada.value);
        respuestaSeleccionada.checked = false;
    } else {
        alert("No seas tramposo elegi una!");
    }
});

function terminar_juego() {
    mostrar_resultados_finales();
}

window.onload = function() {
    iniciar_juego();
};

function sonido_fin() {
    const audio_exito = new Audio('../../../recursos_multimedia/sonido_compra.mp3');
    audio_exito.play();
}