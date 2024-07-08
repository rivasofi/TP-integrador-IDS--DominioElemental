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
    const total_slides=slides.length;
    let slide_actual=0;
    function mostrar_slide(index){
        slides.forEach((slide, idx)=>{
            if (idx===index){
                slide.classList.add('activa');
            } else{
                slide.classList.remove('activa');
            }
        });
    }
    function siguiente_slide(){
        if (slide_actual === total_slides - 1){
            return;
        }
        slide_actual=(slide_actual + 1)%total_slides;
        mostrar_slide(slide_actual);
    }
    function anteriorSlide(){
        if (slide_actual===0){
            return;
        }
        slide_actual =(slide_actual-1+total_slides)%total_slides;
        mostrar_slide(slide_actual);
    }
    document.getElementById('boton_siguiente').addEventListener('click',function(){
        siguiente_slide();
    });
    document.getElementById('boton_anterior').addEventListener('click',function(){
        anteriorSlide();
    });
});

function redireccionar(url) {
    window.location.href = url;
}