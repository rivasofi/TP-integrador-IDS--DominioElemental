const BACKEND_URL = 'https://dominio-backend.onrender.com';

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var form_data = new FormData(this);

    fetch('${BACKEND_URL}/submit', {
        method: 'POST',
        body: form_data
    })
    .then(response => response.text())
    .then(data => {
        alert('¡Datos guardados con éxito!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al guardar los datos.');
    });
});