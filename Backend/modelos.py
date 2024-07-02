from flask_sqlalchemy import CheckConstraint
from flask_sqlalchemy import SQLAlchemy
from app import db

class Carta(db.Model):
    __tablename__ = 'cartas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    elemento = db.Column(db.String(100))
    poder = db.Column(db.Integer)

class Usuario(db.Model):
    __tablename__= 'usuarios'
    id = db.Column(db.Integer,primary_key=True)
    nombre= db.Column(db.string(255),nulltable=False)
    plata= db.Column(db.integer,nulltable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.datetime.now())






