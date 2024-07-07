document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        body: formData
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