
from app import db  # Importar db desde app.py

class Cartas(db.Model):
    __tablename__ = 'cartas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    elemento = db.Column(db.String(100))
    poder = db.Column(db.Integer)
    imagen_frente = db.Column(db.LargeBinary) 
    imagen_dorso = db.Column(db.LargeBinary)   

    def __repr__(self):
        return f'<Cartas {self.nombre}>'
