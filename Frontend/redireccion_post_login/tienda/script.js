document.body.addEventListener('click', function () {
    reproducir_audio();
});

function reproducir_audio() {
    var audio = document.getElementById("background-audio");
    audio.play();
}

function mutear_audio() {
    var audio = document.getElementById("background-audio");
    audio.muted = !audio.muted;
    var icono = document.querySelector('.boton_volumen i');

    if (audio.muted) {
        icono.classList.remove('bx-volume-full');
        icono.classList.add('bx-volume-mute');
    } else {
        icono.classList.remove('bx-volume-mute');
        icono.classList.add('bx-volume-full');
    }
}

function redireccionar(url) {
    window.location.href = url;
}

function obtener_saldo() {
    fetch('http://127.0.0.1:5000/saldo')
        .then(response => response.json())
        .then(data => {
            const saldo_usuario = data.saldo;
            const saldo_elemento = document.getElementById('saldo-usuario');
            if (saldo_elemento) {
                saldo_elemento.textContent = saldo_usuario;
            }
        })
        .catch(error => console.error('Error al obtener el saldo:', error));
}

document.addEventListener('DOMContentLoaded', obtener_saldo);

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.item');

    const hoverSound = document.getElementById('hover-sound');

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const elem_grande = document.querySelector('.elem_grande img');
    const imagenes = [
        "../../recursos_multimedia/aleatorio_1.png",
        "../../recursos_multimedia/aleatorio_2.png",
        "../../recursos_multimedia/aleatorio_3.png",
    ];

    let index = 0;

    function cambiar_foto() {
        elem_grande.src = imagenes[index];

        index++;
        if (index >= imagenes.length) {
            index = 0;
        }
    }
    cambiar_foto();
    setInterval(cambiar_foto, 5000);
});

function confirmar_compra(nombre_producto, precio) {
    var cartel_compra = document.getElementById('cartel_compra');
    var cartel_popup = document.getElementById('cartel_popup');
    var mensaje_confirmar = document.getElementById('mensaje_confirmar');
    var mensaje_exito = document.getElementById('mensaje_exito');

    mensaje_confirmar.textContent = `¿Estás seguro que deseas comprar ${nombre_producto} por ${precio} monedas?`;
    mensaje_exito.style.display = 'none';
    cartel_popup.style.display = 'block';
    cartel_compra.style.display = 'block';
}

function realizar_compra() {
    var mensajeConfirmacion = document.getElementById('mensaje_confirmar').textContent;
    var nombreProducto = mensajeConfirmacion.split(' por ')[0].split('¿Estás seguro que deseas comprar ')[1].trim();

    var precio = 15;

    if (nombreProducto === 'Pack Aleatorio') {
        precio = 10;
    }

    fetch('http://127.0.0.1:5000/comprar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombreProducto,
            precio: precio,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('mensaje_exito').style.display = 'block';
            document.getElementById('saldo-usuario').textContent = data.saldo;
            sonido_compra();
            setTimeout(cerrar_compra, 800);

            if (data.mensaje.includes('Se te sumó')) {
                alert(data.mensaje);
            }            
        })
        .catch(error => {
            console.error('Error al realizar la compra:', error);
            alert('¡Saldo insuficiente!');
        });
}

function cerrar_compra() {
    var cartel_compra = document.getElementById('cartel_compra');
    var cartel_popup = document.getElementById('cartel_popup');
    cartel_compra.style.display = 'none';
    cartel_popup.style.display = 'none';
}

function sonido_compra() {
    const audio_exito = new Audio('../../recursos_multimedia/sonido_compra.mp3');
    audio_exito.play();
}