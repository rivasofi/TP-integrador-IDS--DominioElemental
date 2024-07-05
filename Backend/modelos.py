from sqlalchemy import LargeBinary
from app import db  # Importar db desde app.py

class Carta(db.Model):
    __tablename__ = 'cartas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    elemento = db.Column(db.String(100))
    poder = db.Column(db.Integer)
    imagen = db.Column(db.LargeBinary)  # Columna para almacenar imágenes

    def __repr__(self):
        return f'<Carta {self.nombre}>'
