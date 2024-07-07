function redireccionar(url) {
    window.location.href = url;
}

const preguntas_quiz = [
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
        pregunta: " ¿Qué propiedad CSS se utiliza para definir el ancho de un elemento?",
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
