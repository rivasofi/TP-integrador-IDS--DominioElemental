document.addEventListener("DOMContentLoaded", function () {
    const perfiles = document.querySelectorAll('.perfil');

    const hoverSound = new Audio('../recursos_multimedia/hoover-about_us.mp3');
    hoverSound.preload = 'auto';

    hoverSound.play().then(() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
    });

    perfiles.forEach(perfil => {
        perfil.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
});
