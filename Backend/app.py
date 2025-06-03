from flask import Flask, jsonify, send_from_directory, request
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
    
@app.route('/cartas_usuario')
def obtener_cartas_usuario():
    usuario_demo = Usuario.query.filter_by(nombre='Demo').first()
    if usuario_demo:
        cartas_usuario = CartasUsuario.query.filter_by(usuario_id=usuario_demo.id).all()
        cartas = []
        for cu in cartas_usuario:
            carta = Carta.query.get(cu.carta_id)
            if carta:
                cartas.append({
                    'id': carta.id,
                    'nombre': carta.nombre,
                    'elemento': carta.elemento,
                    'poder': carta.poder,
                    'cantidad': cu.cantidad
                })
        return jsonify(cartas)
    return jsonify([])
    
@app.route('/sumar_saldo', methods=['POST'])
def sumar_saldo():
    usuario_demo = Usuario.query.filter_by(nombre='Demo').first()
    if usuario_demo:
        usuario_demo.plata += 1
        db.session.commit()
        return jsonify({'mensaje': 'Saldo sumado correctamente.', 'saldo': usuario_demo.plata}), 200
    else:
        return jsonify({'error': 'Usuario no encontrado.'}), 404