from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from modelos import Registro, Carta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natashapetriw:geor@localhost:5432/intro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db = SQLAlchemy(app)

# Definir rutas y lógica de la aplicación Flask
@app.route('/registro', methods=['POST'])
def registro():
    if request.method == 'POST':
        usuario = request.form['usuario']
        email = request.form['email']
        contraseña = request.form['contraseña']
        confirmar_contraseña = request.form['confirmar_contraseña']

        # Verificar si las contraseñas coinciden
        if contraseña != confirmar_contraseña:
            return "Las contraseñas no coinciden. Inténtalo de nuevo."

        # Crear una nueva instancia del modelo Registro
        nuevo_registro = Registro(usuario=usuario, email=email, contraseña=contraseña, confirmar_contraseña=confirmar_contraseña)

        # Añadir al contexto de la sesión y confirmar cambios
        db.session.add(nuevo_registro)
        db.session.commit()

        return "¡Registro exitoso!"

    return render_template('registrarse/index.html')

if __name__ == '__main__':
    app.run(debug=True)
