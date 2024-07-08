//****** GAME LOOP ********//

var time = new Date();
var delta_time = 0;

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1);
} else {
    document.addEventListener("DOMContentLoaded", init);
}

function init() {
    time = new Date();
    start();
    loop();
}

function loop() {
    delta_time = (new Date() - time) / 1000;
    time = new Date();
    update();
    requestAnimationFrame(loop);
}

//****** GAME LOGIC ********//

var suelo_y = 22;
var vel_y = 0;
var impulso = 900;
var gravedad = 2500;

var dino_pos_x = 42;
var dino_pos_y = suelo_y;

var suelo_x = 0;
var vel_escenario = 1280 / 3;
var game_vel = 1;
var score = 0;

var parado = false;
var saltando = false;

var tiempo_hasta_obstaculo = 2;
var tiempo_obstaculo_min = 0.7;
var tiempo_obstaculo_max = 1.8;
var obstaculo_pos_y = 16;
var obstaculos = [];

var tiempo_hasta_nube = 0.5;
var tiempo_nube_min = 0.7;
var tiempo_nube_max = 2.7;
var max_nube_y = 270;
var min_nube_y = 100;
var nubes = [];
var vel_nube = 0.5;

var contenedor;
var dino;
var texto_score;
var suelo;
var game_over_element;

function start() {
    game_over_element = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    texto_score = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", handle_key_down);
}

function update() {
    if (parado) return;

    mover_dinosaurio();
    mover_suelo();
    decidir_crear_obstaculos();
    decidir_crear_nubes();
    mover_obstaculos();
    mover_nubes();
    detectar_colision();

    vel_y -= gravedad * delta_time;
}

function handle_key_down(ev) {
    if (ev.keyCode == 32) {
        saltar();
    }
}

function saltar() {
    if (dino_pos_y === suelo_y) {
        saltando = true;
        vel_y = impulso;
        dino.classList.remove("dino-corriendo");
    }
}

function mover_dinosaurio() {
    dino_pos_y += vel_y * delta_time;
    if (dino_pos_y < suelo_y) {
        tocar_suelo();
    }
    dino.style.bottom = dino_pos_y + "px";
}

function tocar_suelo() {
    dino_pos_y = suelo_y;
    vel_y = 0;
    if (saltando) {
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}

function mover_suelo() {
    suelo_x += calcular_desplazamiento();
    suelo.style.left = -(suelo_x % contenedor.clientWidth) + "px";
}

function calcular_desplazamiento() {
    return vel_escenario * delta_time * game_vel;
}

function estrellarse() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
}

function decidir_crear_obstaculos() {
    tiempo_hasta_obstaculo -= delta_time;
    if (tiempo_hasta_obstaculo <= 0) {
        crear_obstaculo();
    }
}

function decidir_crear_nubes() {
    tiempo_hasta_nube -= delta_time;
    if (tiempo_hasta_nube <= 0) {
        crear_nube();
    }
}

function crear_obstaculo() {
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if (Math.random() > 0.5) obstaculo.classList.add("cactus2");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth + "px";

    obstaculos.push(obstaculo);
    tiempo_hasta_obstaculo = tiempo_obstaculo_min + Math.random() * (tiempo_obstaculo_max - tiempo_obstaculo_min) / game_vel;
}

function crear_nube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth + "px";
    nube.style.bottom = min_nube_y + Math.random() * (max_nube_y - min_nube_y) + "px";

    nubes.push(nube);
    tiempo_hasta_nube = tiempo_nube_min + Math.random() * (tiempo_nube_max - tiempo_nube_min) / game_vel;
}

function mover_obstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
            ganar_puntos();
        } else {
            obstaculos[i].posX -= calcular_desplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX + "px";
        }
    }
}

function mover_nubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if (nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        } else {
            nubes[i].posX -= calcular_desplazamiento() * vel_nube;
            nubes[i].style.left = nubes[i].posX + "px";
        }
    }
}

function ganar_puntos() {
    score++;
    texto_score.innerText = score;
    if (score == 5) {
        game_vel = 1.5;
        contenedor.classList.add("mediodia");
        mostrar_alert("¡Felicitaciones! Has ganado 1 moneda 🎉🎉");
        sumar_saldo();
    } else if (score == 10) {
        game_vel = 2;
        contenedor.classList.add("tarde");
        sumar_saldo();
        mostrar_alert("¡A por todo! Has ganado 1 moneda mas 😎🤩");
        

    } else if (score == 20) {
        game_vel = 3;
        contenedor.classList.add("noche");
        mostrar_alert("¡Segui asi! Has ganado 1 moneda mas 🎉🎉");
        sumar_saldo();
    }
    suelo.style.animationDuration = (3 / game_vel) + "s";
}

function mostrar_game_over() {
    estrellarse();
    game_over_element.style.display = "block";
}

function detectar_colision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX > dino_pos_x + dino.clientWidth) {
            //EVADE
            break; //al estar en orden, no puede chocar con más
        } else {
            if (is_collision(dino, obstaculos[i], 10, 30, 15, 20)) {
                mostrar_game_over();
            }
        }
    }
}

function is_collision(a, b, padding_top, padding_right, padding_bottom, padding_left) {
    var a_rect = a.getBoundingClientRect();
    var b_rect = b.getBoundingClientRect();

    return !(
        (a_rect.top + a_rect.height - padding_bottom < b_rect.top) ||
        (a_rect.top + padding_top > b_rect.top + b_rect.height) ||
        (a_rect.left + a_rect.width - padding_right < b_rect.left) ||
        (a_rect.left + padding_left > b_rect.left + b_rect.width)
    );
}

function mostrar_alert(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function sumar_saldo() {
    fetch('http://127.0.0.1:5000/sumar_saldo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const saldo_usuario = document.getElementById('saldo-usuario');
        if (saldo_usuario) {
            saldo_usuario.textContent = data.saldo;
            console.log('Saldo actualizado:', data.saldo);
        }
    });
}

document.addEventListener('DOMContentLoaded', obtener_saldo);

function obtener_saldo() {
    fetch('/saldo')
        .then(response => response.json())
        .then(data => {
            const saldo_usuario = data.saldo;
            actualizar_saldo_en_interfaz(saldo_usuario);
        });
}

function actualizar_saldo_en_interfaz(saldo) {
    const saldo_elemento = document.getElementById('saldo-usuario');
    if (saldo_elemento) {
        saldo_elemento.textContent = saldo;
    }
}