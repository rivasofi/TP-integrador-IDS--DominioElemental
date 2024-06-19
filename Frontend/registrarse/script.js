document.addEventListener('DOMContentLoaded', function() {
    var boton_terminos_condiciones = document.getElementById('terminos_cond_boton');
    var div_terminos_condiciones = document.getElementById('terminos');
    var formulario_registro = document.querySelector('form');
    var checkbox_aceptar_terminos = document.querySelector('input[type="checkbox"]');
    var contrasena = document.getElementById('password');
    var confirmar_contra = document.getElementById('confirmar_contra');

    boton_terminos_condiciones.addEventListener('click', function (evento) {
        evento.preventDefault();
        if (div_terminos_condiciones.style.display === 'none' || div_terminos_condiciones.style.display === '') {
            div_terminos_condiciones.style.display = 'block';
        } else {
            div_terminos_condiciones.style.display = 'none';
        }
    });
    formulario_registro.addEventListener('submit', function(evento) {
        if (!checkbox_aceptar_terminos.checked) {
            alert('debes aceptar los terminos y condiciones');
            evento.preventDefault();
        }if (contrasena.value !== confirmar_contra.value) {
            alert('las contraseñas no son iguales');
            evento.preventDefault();
        }
    });
});