document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item_grid');
    const hover_sound = new Audio('../../recursos_multimedia/hover_tienda.mp3');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hover_sound.currentTime = 0;
            hover_sound.play();

            const img_element = item.querySelector('img');
            const titulo_juego = img_element.alt.trim();
            const imagenes = obtener_imagenes(titulo_juego);
            if (imagenes.length > 0) {
                img_element.src = imagenes[1];
            }
        });

        item.addEventListener('mouseleave', () => {
            const img_element = item.querySelector('img');
            const titulo_juego = img_element.alt.trim();
            const imagenes = obtener_imagenes(titulo_juego);

            if (imagenes.length > 0) {
                img_element.src = imagenes[0];
            }
        });
    });

    function obtener_imagenes(titulo_juego) {
        const imagenes = {
            "juego_preguntas": [
                "../../recursos_multimedia/banner2_agua.png",
                "../../recursos_multimedia/banner_agua.png"
            ],
            "juego_correr": [
                "../../recursos_multimedia/banner_dino2.png",
                "../../recursos_multimedia/banner_dino.png"
            ],
            "juego_tateti": [
                "../../recursos_multimedia/banner_2tateti.png",
                "../../recursos_multimedia/banner_tateti.png"
            ],
            "juego_memoria": [
                "../../recursos_multimedia/banner2_memotest.png",
                "../../recursos_multimedia/banner_memotest.png"
            ]
        };

        return imagenes[titulo_juego] || [];
    }
});
