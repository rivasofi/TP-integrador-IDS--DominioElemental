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

document.addEventListener('DOMContentLoaded',function(){
    const slides=document.querySelectorAll('.slide');
    const totalSlides=slides.length;
    let currentSlide=0;
    function mostrarSlide(index){
        slides.forEach((slide, idx)=>{
            if (idx===index){
                slide.classList.add('activa');
            } else{
                slide.classList.remove('activa');
            }
        });
    }
    function siguienteSlide(){
        if (currentSlide === totalSlides - 1){
            return;
        }
        currentSlide=(currentSlide + 1)%totalSlides;
        mostrarSlide(currentSlide);
    }
    function anteriorSlide(){
        if (currentSlide===0){
            return;
        }
        currentSlide =(currentSlide-1+totalSlides)%totalSlides;
        mostrarSlide(currentSlide);
    }
    document.getElementById('boton_siguiente').addEventListener('click',function(){
        siguienteSlide();
    });
    document.getElementById('boton_anterior').addEventListener('click',function(){
        anteriorSlide();
    });
});

function redireccionar(url) {
    window.location.href = url;
}