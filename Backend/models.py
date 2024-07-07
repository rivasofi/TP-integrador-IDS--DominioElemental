from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
