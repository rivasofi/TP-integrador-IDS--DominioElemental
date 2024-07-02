from flask_sqlalchemy import CheckConstraint
from flask_sqlalchemy import SQLAlchemy
from app import db

class Usuario(db.Model):
    __tablename__= 'usuarios'
    id = db.Column(db.Integer,primary_key=True)
    nombre= db.Column(db.string(255),nulltable=False)
    plata= db.Column(db.integer,nulltable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.datetime.now())

class Carta(db.Model):
    __tablename__ = 'cartas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    elemento = db.Column(db.String(100))
    poder = db.Column(db.Integer)

class Registro(db.Model):
    __tablename__ = 'registro'
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(1000), nullable=False)
    email = db.Column(db.String(1000), nullable=False)
    contraseña = db.Column(db.String(1000), nullable=False)
    confirmar_contraseña = db.Column(db.String(1000), nullable=False)

    __table_args__ = (
        CheckConstraint('confirmar_contraseña = contraseña', name='chk_confirmacion_contraseña'),
    )