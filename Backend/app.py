from flask import Flask, jsonify, send_from_directory, request, flash
from config import SQLALCHEMY_DATABASE_URI
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from models import db, Carta, Usuario, CartasUsuario
import os
from sqlalchemy.sql.expression import func
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)

@app.route('/')
def index():
    return send_from_directory('Frontend', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('Frontend', path)

@app.route('/saldo')
def obtener_saldo():
    from models import Usuario
    usuario_demo = Usuario.query.filter_by(nombre='Demo').first()
    if usuario_demo:
        return jsonify({'saldo': usuario_demo.plata})
    return jsonify({'saldo': 0})

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['contact_nom']
    email = request.form['contact_email']
    subject = request.form['contact_sujet']
    message = request.form['contact_message']

    output_file = os.path.join(os.path.dirname(__file__), 'datos_formulario.txt')

    if not os.path.exists(output_file):
        with open(output_file, 'w', encoding='utf-8') as f:
            pass

    with open(output_file, 'a', encoding='utf-8') as f:
        f.write(f"Nombre: {name}\nEmail: {email}\nAsunto: {subject}\nMensaje: {message}\n{'-'*40}\n")

    return '¡Datos guardados con éxito!'

@app.route('/comprar', methods=['POST'])
def comprar_carta():
    data = request.json
    nombre_producto = data.get('nombre')
    precio = data.get('precio')

    usuario = Usuario.query.filter_by(nombre='Demo').first()

    if usuario:
        if usuario.plata >= precio:
            usuario.plata -= precio
            
            elemento = ''
            if nombre_producto == 'Pack Hielo':
                elemento = 'nieve'
            elif nombre_producto == 'Pack Fuego':
                elemento = 'fuego'
            elif nombre_producto == 'Pack Agua':
                elemento = 'agua'
            elif nombre_producto == 'Pack Tierra':
                elemento = 'tierra'
            elif nombre_producto == 'Pack Aleatorio':
                elementos = ['nieve', 'fuego', 'agua', 'tierra']
                elemento = random.choice(elementos)

            cartas = Carta.query.filter_by(elemento=elemento).order_by(func.random()).limit(4).all()
            
            dinero_adicional = 0
            for carta in cartas:
                cartas_usuario_entry = CartasUsuario.query.filter_by(usuario_id=usuario.id, carta_id=carta.id).first()
                if cartas_usuario_entry:
                    if cartas_usuario_entry.cantidad == 1:
                        usuario.plata += 2
                        dinero_adicional += 2
                    else:
                        cartas_usuario_entry.cantidad += 1
                else:
                    cartas_usuario_entry = CartasUsuario(usuario_id=usuario.id, carta_id=carta.id, cantidad=1)
                    db.session.add(cartas_usuario_entry)
            
            db.session.commit()
            
            mensaje = f'Compra de {nombre_producto} realizada con éxito.'
            if dinero_adicional > 0:
                mensaje += f' Se te sumó ${dinero_adicional} por cartas repetidas.'

            return jsonify({'mensaje': mensaje, 'saldo': usuario.plata}), 200
        else:
            return jsonify({'error': 'Saldo insuficiente para realizar la compra.'}), 400
    else:
        return jsonify({'error': 'Usuario no encontrado.'}), 404
    
if __name__ == '__main__':
    
    with app.app_context():
        db.create_all()
        if Carta.query.count() == 0:
            data = [
                (1, 'emilia mernes', 'agua', 118),
                (2, 'lady gaga', 'nieve', 119),
                (3, 'leo mattioli', 'nieve', 70),
                (4, 'sza', 'fuego', 51),
                (5, 'sabrina carpenter', 'fuego', 73),
                (6, 'fito paez', 'fuego', 78),
                (7, 'olivia rodrigo', 'tierra', 84),
                (8, 'melanie martinez', 'fuego', 68),
                (9, 'mariah carey', 'fuego', 62),
                (10, 'duki', 'nieve', 119),
                (11, 'nicki nicole', 'agua', 48),
                (12, 'tini', 'tierra', 48),
                (13, 'jennie', 'agua', 103),
                (14, 'itzy', 'fuego', 92),
                (15, 'rose', 'tierra', 97),
                (16, 'enano bostero', 'nieve', 115),
                (17, 'ricardo fort', 'nieve', 89),
                (18, 'milky dolly', 'fuego', 56),
                (19, 'anto pane', 'nieve', 67),
                (20, 'moria casan', 'agua', 106),
                (21, 'mirtha legrand', 'nieve', 89),
                (22, 'pomelo', 'agua', 92),
                (23, 'pulpo paul', 'agua', 81),
                (24, 'perra laika', 'nieve', 70),
                (25, 'oveja dolly', 'tierra', 115),
                (26, 'linux', 'nieve', 68),
                (27, 'clippy', 'agua', 64),
                (28, 'octocat', 'tierra', 112),
                (29, 'gnu', 'tierra', 57),
                (30, 'firefox', 'fuego', 65),
                (31, 'docker', 'agua', 104),
                (32, 'nessie', 'agua', 114),
                (33, 'barbie', 'nieve', 61),
                (34, 'regina george', 'agua', 45),
                (35, 'cady heron', 'nieve', 68),
                (36, 'gretchen wieners', 'fuego', 110),
                (37, 'karen smith', 'agua', 50),
                (38, 'janis', 'agua', 97),
                (39, 'elle woods', 'nieve', 107),
                (40, 'cher clueless', 'agua', 94),
                (41, 'thranduil', 'nieve', 48),
                (42, 'legolas', 'agua', 101),
                (43, 'gandalf', 'fuego', 97),
                (44, 'naruto', 'tierra', 95),
                (45, 'sakura', 'tierra', 73),
                (46, 'aang', 'aire', 46),
                (47, 'zuko', 'fuego', 64),
                (48, 'azula', 'fuego', 53),
                (49, 'katara', 'agua', 88),
                (50, 'sokka', 'agua', 76),
                (51, 'suki', 'tierra', 105),
                (52, 'toph', 'tierra', 67),
                (53, 'appa', 'aire', 114),
                (54, 'yue', 'agua', 74),
                (55, 'korra', 'agua', 48),
                (56, 'momo', 'aire', 115),
                (57, 'iroh', 'fuego', 82),
                (58, 'steve', 'tierra', 82),
                (59, 'creeper', 'tierra', 55)
            ]
    
            for carta_data in data:
                carta = Carta(id=carta_data[0], nombre=carta_data[1], elemento=carta_data[2], poder=carta_data[3])
                db.session.add(carta)
                
            try:
                db.session.commit()
            except IntegrityError as e:
                db.session.rollback()
                print(f'Error al insertar datos iniciales: {str(e)}')
                
        if Usuario.query.filter_by(nombre='Demo').first() is None:
            usuario_demo = Usuario(nombre='Demo', plata=30)
            db.session.add(usuario_demo)
            db.session.commit()

    app.run(debug=True)
