const BACKEND_URL = 'https://dominio-backend.onrender.com';

let tarjetasDestapadas = 0; 
let tarjeta1 = null; 
let tarjeta2 = null; 
let primerResultado = null; 
let segundoResultado = null; 
let movimientos = 0; 
let aciertos = 0; 
let temporizador = false; 
let timer = 40; 
let tiempoRegresivoId = null; 
let timerInicial = 40; 


let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("t-restante")


let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7,7,8, 8]; 
numeros = numeros.sort(()=>{return Math.random()-0.5}); 
console.log(numeros); 

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            alert("¡PERDISTE! El tiempo se ha agotado ⌛. Reinicia la pagina para jugar nuevamente");
        }
    }, 1000);
}

function bloquearTarjetas(){

    for( let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i); 
        tarjetaBloqueada.innerHTML = numeros[i]; 
        tarjetaBloqueada.disabled = true; 
    }
}


function destapar(id){
    if(temporizador == false){
        contarTiempo(); 
        temporizador = true; 
    }

    tarjetasDestapadas++; 
    console.log(tarjetasDestapadas); 


    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id); 
        primerResultado = numeros[id]; 
        tarjeta1.innerHTML = primerResultado; 

        tarjeta1.disabled = true; 

    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id); 
        segundoResultado = numeros[id]; 
        tarjeta2.innerHTML = segundoResultado;
        
        tarjeta2.disabled = true; 

        movimientos++; 
        mostrarMovimientos.innerHTML = `Movimientos: `+ movimientos; 

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;
            
            aciertos++; 
            sumar_saldo();
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`; 

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId); 
                mostrarAciertos.innerHTML =`Aciertos: ${aciertos} 😎 `;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🙌🏼`;
                mostrarTiempo.innerHTML =  `Fantastico! 🎉 Solo tardaste: ${timerInicial - timer} segundos`;
                alert("¡Felicitaciones! Has ganado $8 monedas 🎉💰");

                fetch('/sumar_saldo_juego', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }


        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = ' '; 
                tarjeta2.innerHTML = ' '; 
                tarjeta1.disabled = false; 
                tarjeta2.disabled = false; 
                tarjetasDestapadas = 0; 
            }, 800);
        }
    }
    


}

function sumar_saldo() {
    fetch('${BACKEND_URL}/sumar_saldo', {
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
