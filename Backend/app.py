from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natashapetriw:geor@localhost:5432/intro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db = SQLAlchemy(app)

# Inicializar Flask-Migrate
migrate = Migrate(app, db)

# Importar modelos después de inicializar db para evitar importaciones circulares
from modelos import Cartas

if __name__ == '__main__':
    app.run(debug=True)
