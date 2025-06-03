const BACKEND_URL = 'https://dominio-backend.onrender.com';
const game_board = document.querySelector("#gameboard");
const info_display = document.querySelector("#info");
const start_cells = ["", "", "", "", "", "", "", "", ""];
info_display.style.fontFamily = "'Open Sans', sans-serif";
info_display.style.color = "white";
let go = "fuego"; 
info_display.textContent = "A jugar!";

function create_board() {
    start_cells.forEach((_cell, index) => {
        const cell_element = document.createElement("div");
        cell_element.classList.add("square");
        cell_element.id = index;
        cell_element.addEventListener("click", add_go);
        game_board.append(cell_element);
    });

    setTimeout(make_random_move, 500);
}

create_board();

function add_go(e) {
    if (go === "fuego") {
        console.log("clicked", e.target);
        const go_display = document.createElement("div");
        go_display.classList.add(go);
        e.target.append(go_display);
        e.target.removeEventListener("click", add_go);
        go = "hielo";
        info_display.textContent = "Ahora es el turno de hielo.";
        check_score();
        setTimeout(make_random_move, 500);
    }
}

function make_random_move() {
    const all_squares = document.querySelectorAll(".square");
    const empty_squares = Array.from(all_squares).filter(square => !square.firstChild);
    if (empty_squares.length > 0 && go === "hielo") {
        const random_index = Math.floor(Math.random() * empty_squares.length);
        const random_square = empty_squares[random_index];
        const go_display = document.createElement("div");
        go_display.classList.add("hielo");
        random_square.append(go_display);
        random_square.removeEventListener("click", add_go);
        go = "fuego";
        info_display.textContent = "Ahora es el turno de fuego.";
        check_score();
    }
}

function check_score() {
    const all_squares = document.querySelectorAll(".square");
    const winning_combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    
    winning_combos.forEach(array => {
        const hielo_wins = array.every(cell => all_squares[cell].firstChild?.classList.contains("hielo"));
        
        if (hielo_wins) {
            info_display.textContent = "Gano Hielo! Vuelve a la tienda a ver tu saldo actual.";
            disable_board();

        }
    });

    winning_combos.forEach(array => {
        const fuego_wins = array.every(cell => all_squares[cell].firstChild?.classList.contains("fuego"));
        
        if (fuego_wins) {
            info_display.textContent = "Gano Fuego! Vuelve a la tienda a ver tu saldo actual.";
            sumar_saldo();
            disable_board();
            mostrar_alert("¡Felicitaciones! Has ganado 2 monedas 🎉🎉");
            
        }
    });
}

function disable_board() {
    const all_squares = document.querySelectorAll(".square");
    all_squares.forEach(square => {
        const new_square = square.cloneNode(true);
        square.replaceWith(new_square);
        
    });
}

function sumar_saldo() {
    fetch(`${BACKEND_URL}/sumar_saldo`, {
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
