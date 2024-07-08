const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
infoDisplay.style.fontFamily = "'Open Sans', sans-serif";
infoDisplay.style.color = "white";
let go = "fuego"; 
infoDisplay.textContent = "A jugar!";


function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement);
    });

    
    setTimeout(makeRandomMove, 500);
}

createBoard();

function addGo(e) {
    if (go === "fuego") {
        console.log("clicked", e.target);
        const goDisplay = document.createElement("div");
        goDisplay.classList.add(go);
        e.target.append(goDisplay);
        e.target.removeEventListener("click", addGo);
        go = "hielo";
        infoDisplay.textContent = "Ahora es el turno de hielo.";
        checkScore();
        setTimeout(makeRandomMove, 500);
    }
}

function makeRandomMove() {
    const allSquares = document.querySelectorAll(".square");
    const emptySquares = Array.from(allSquares).filter(square => !square.firstChild);
    if (emptySquares.length > 0 && go === "hielo") {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const randomSquare = emptySquares[randomIndex];
        const goDisplay = document.createElement("div");
        goDisplay.classList.add("hielo");
        randomSquare.append(goDisplay);
        randomSquare.removeEventListener("click", addGo);
        go = "fuego";
        infoDisplay.textContent = "Ahora es el turno de fuego.";
        checkScore();
    }
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    
    winningCombos.forEach(array => {
        const hieloWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("hielo"));
        
        if (hieloWins) {
            infoDisplay.textContent = "Gano Hielo! Vuelve a la tienda a ver tu saldo actual.";
            disableBoard();
        }
    });

    winningCombos.forEach(array => {
        const fuegoWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("fuego"));
        
        if (fuegoWins) {
            infoDisplay.textContent = "Gano Fuego! Vuelve a la tienda a ver tu saldo actual.";
            sumar_saldo();
            disableBoard();
        }
    });
}

function disableBoard() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        const newSquare = square.cloneNode(true);
        square.replaceWith(newSquare);
    });
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