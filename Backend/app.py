from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from modelos import Carta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natashapetriw:geor@localhost:5432/intro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db = SQLAlchemy(app)

