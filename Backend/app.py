from flask import Flask
from config import SQLALCHEMY_DATABASE_URI
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Carta(db.Model):
    __tablename__ = 'carta'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    elemento = db.Column(db.String(50), nullable=False)
    poder = db.Column(db.Integer, nullable=False)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    plata = db.Column(db.Integer, nullable=False, default=30)
    
class CartasUsuario(db.Model):
    __tablename__ = 'cartas_usuario'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    carta_id = db.Column(db.Integer, db.ForeignKey('carta.id'), nullable=False)
    cantidad = db.Column(db.Integer, default=1)

    usuario = db.relationship('Usuario', backref=db.backref('cartas_usuario', cascade='all, delete-orphan'))
    carta = db.relationship('Carta')

with app.app_context():
    db.create_all()

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
    db.session.commit()
    
    usuario_demo = Usuario(nombre='Demo', plata=30)
    db.session.add(usuario_demo)
    db.session.commit()
    

@app.route('/cartas')
def obtener_cartas():
    cartas = Carta.query.all()
    resultado = []
    for carta in cartas:
        carta_dict = {
            'id': carta.id,
            'nombre': carta.nombre,
            'elemento': carta.elemento,
            'poder': carta.poder
        }
        resultado.append(carta_dict)
    return {'cartas': resultado}

if __name__ == '__main__':
    app.run(debug=True)
