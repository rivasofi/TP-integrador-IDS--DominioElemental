document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item_grid');
    const hover_sound = new Audio('../../recursos_multimedia/hover_tienda.mp3');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hover_sound.currentTime = 0;
            hover_sound.play();

            const img_element = item.querySelector('img');
            const titulo_juego = item.querySelector('.titulo_juego').textContent.trim();
            const imagenes = obtener_imagenes(titulo_juego);
            if (imagenes.length > 0) {
                img_element.src = imagenes[1];
            }
        });

        item.addEventListener('mouseleave', () => {
            const img_element = item.querySelector('img');
            const titulo_juego = item.querySelector('.titulo_juego').textContent.trim();
            const imagenes = obtener_imagenes(titulo_juego);

            if (imagenes.length > 0) {
                img_element.src = imagenes[0];
            }
        });
    });

    function obtener_imagenes(titulo_juego) {
        const imagenes = {
            "PROBA TU CONOCIMIENTO!": [
                "../../recursos_multimedia/30.png",
                "../../recursos_multimedia/27.png"
            ],
            "DINO GAME": [
                "../../recursos_multimedia/imagenes_login/login_3.png",
                "../../recursos_multimedia/imagenes_login/login_4.png"
            ],
            "TATETI HELADO": [
                "../../recursos_multimedia/imagenes_login/login_6.png",
                "../../recursos_multimedia/imagenes_login/login_5.png"
            ],
            "TE ACORDAS DE TODOS?": [
                "../../recursos_multimedia/imagenes_login/login_7.png",
                "../../recursos_multimedia/imagenes_login/login_8.png"
            ]
        };

        return imagenes[titulo_juego] || [];
    }
});
