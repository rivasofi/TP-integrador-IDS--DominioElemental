document.addEventListener('DOMContentLoaded', function () {
    var boton_terminos_condiciones = document.getElementById('terminos_cond_boton');
    var popup_terminos_condiciones = document.getElementById('terminos_popup');
    var close_popup = document.getElementById('close_popup');
    var accept_terms = document.getElementById('accept_terms');
    var formulario_registro = document.querySelector('form');
    var checkbox_aceptar_terminos = document.querySelector('input[type="checkbox"]');
    var contrasena = document.getElementById('password');
    var confirmar_contra = document.getElementById('confirmar_contra');

    boton_terminos_condiciones.addEventListener('click', function (evento) {
        evento.preventDefault();
        popup_terminos_condiciones.style.display = 'block';
    });

    close_popup.addEventListener('click', function () {
        popup_terminos_condiciones.style.display = 'none';
    });

    accept_terms.addEventListener('click', function () {
        popup_terminos_condiciones.style.display = 'none';
        checkbox_aceptar_terminos.checked = true;
    });

    window.addEventListener('click', function (event) {
        if (event.target == popup_terminos_condiciones) {
            popup_terminos_condiciones.style.display = 'none';
        }
    });

    formulario_registro.addEventListener('submit', function (evento) {
        if (!checkbox_aceptar_terminos.checked) {
            alert('Debes aceptar los términos y condiciones');
            evento.preventDefault();
        } else if (contrasena.value !== confirmar_contra.value) {
            alert('Las contraseñas no son iguales');
            evento.preventDefault();
        }
    });
});
