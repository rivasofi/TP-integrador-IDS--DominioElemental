from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natashapetriw:geor@localhost:5432/intro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from modelos import Carta



def load_image_as_binary(relative_path):
    with open(relative_path, 'rb') as file:
        return file.read()


@app.route('/cartas', methods=['GET'])
def get_cartas():
    cartas = Carta.query.all()
    result = [{
        "id": carta.id,
        "nombre": carta.nombre,
        "elemento": carta.elemento,
        "poder": carta.poder,
        "imagen_frente": carta.imagen_frente,
        "imagen_dorso": carta.imagen_dorso
    } for carta in cartas]
    return jsonify(result)


@app.route('/cartas/<int:id>', methods=['GET'])
def get_carta(id):
    carta = Carta.query.get_or_404(id)
    result = {
        "id": carta.id,
        "nombre": carta.nombre,
        "elemento": carta.elemento,
        "poder": carta.poder,
        "imagen_frente": carta.imagen_frente,
        "imagen_dorso": carta.imagen_dorso
    }
    return jsonify(result)


@app.route('/cartas', methods=['POST'])
def create_carta():
    data = request.get_json()
    nueva_carta = Carta(
        nombre=data['nombre'],
        elemento=data['elemento'],
        poder=data['poder'],
        imagen_frente=load_image_as_binary(data['imagen_frente']),
        imagen_dorso=load_image_as_binary(data['imagen_dorso'])
    )
    db.session.add(nueva_carta)
    db.session.commit()
    return jsonify({
        "id": nueva_carta.id,
        "nombre": nueva_carta.nombre,
        "elemento": nueva_carta.elemento,
        "poder": nueva_carta.poder,
        "imagen_frente": nueva_carta.imagen_frente,
        "imagen_dorso": nueva_carta.imagen_dorso
    }), 201


@app.route('/cartas/<int:id>', methods=['PUT'])
def update_carta(id):
    data = request.get_json()
    carta = Carta.query.get_or_404(id)
    carta.nombre = data['nombre']
    carta.elemento = data['elemento']
    carta.poder = data['poder']
    carta.imagen_frente = load_image_as_binary(data['imagen_frente'])
    carta.imagen_dorso = load_image_as_binary(data['imagen_dorso'])
    db.session.commit()
    return jsonify({
        "id": carta.id,
        "nombre": carta.nombre,
        "elemento": carta.elemento,
        "poder": carta.poder,
        "imagen_frente": carta.imagen_frente,
        "imagen_dorso": carta.imagen_dorso
    })


@app.route('/cartas/<int:id>', methods=['DELETE'])
def delete_carta(id):
    carta = Carta.query.get_or_404(id)
    db.session.delete(carta)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
