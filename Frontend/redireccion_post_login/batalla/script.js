document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item_grid');
    const hoverSound = new Audio('../../recursos_multimedia/hover_tienda.mp3');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item_grid');
    const images = {
        archivo1: [
            "../../recursos_multimedia/imagenes_login/login_4.png",
            "../../recursos_multimedia/imagenes_login/login_6.png"
        ],
        archivo2: [
            "../../recursos_multimedia/imagenes_login/login_3.png",
            "../../recursos_multimedia/imagenes_login/login_4.png"
        ],
        archivo3: [
            "../../recursos_multimedia/imagenes_login/login_6.png",
            "../../recursos_multimedia/imagenes_login/login_5.png"
        ],
        archivo4: [
            "../../recursos_multimedia/imagenes_login/login_7.png",
            "../../recursos_multimedia/imagenes_login/login_8.png"
        ]
    };

    items.forEach(item => {
        const gameName = item.getAttribute('href').split('/').pop().replace('.html', '');
        let currentIndex = 0;
        const imgElement = item.querySelector('img');
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images[gameName].length;
            const imgUrl = images[gameName][currentIndex];
            imgElement.src = imgUrl;
        }, 3000);
    });
});
