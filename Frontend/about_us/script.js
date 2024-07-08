document.addEventListener("DOMContentLoaded", function () {
    const perfiles = document.querySelectorAll('.perfil');

    const hover_sound = new Audio('../recursos_multimedia/hoover-about_us.mp3');
    hover_sound.preload = 'auto';

    hover_sound.play().then(() => {
        hover_sound.pause();
        hover_sound.currentTime = 0;
    });

    perfiles.forEach(perfil => {
        perfil.addEventListener('mouseenter', () => {
            hover_sound.currentTime = 0;
            hover_sound.play();
        });
    });
});
