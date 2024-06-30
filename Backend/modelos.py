from flask_sqlalchemy import CheckConstraint
from flask_sqlalchemy import SQLAlchemy
from app import db

class Carta(db.Model):
    __tablename__ = 'cartas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    elemento = db.Column(db.String(100))
    poder = db.Column(db.Integer)







