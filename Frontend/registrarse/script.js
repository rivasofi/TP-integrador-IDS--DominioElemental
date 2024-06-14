document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('terminos_cond_boton').addEventListener('click', function (evento) {
        evento.preventDefault();
        var terminosDiv = document.getElementById('terminos');
        if (terminosDiv.style.display === 'none') {
            terminosDiv.style.display = 'block';
        } else {
            terminosDiv.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        var termsCheckbox = document.querySelector('input[type="checkbox"]');
        if (!termsCheckbox.checked) {
            event.preventDefault();
        }
    });
});