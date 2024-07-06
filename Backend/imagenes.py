import os
from flask import Flask
from app import db
from modelos import Carta  

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natashapetriw:geor@localhost:5432/intro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def load_image_as_binary(relative_path):
    with open(relative_path, 'rb') as file:
        return file.read()

def update_images():
    base_dir = '../Frontend/recursos_multimedia/Cartas/'
    elementos = ['cartas_fuego', 'cartas_agua', 'cartas_tierra', 'cartas_nieve']

    with app.app_context():
        for elemento in elementos:
            frente_dir = os.path.join(base_dir, elemento, 'frente')
            dorso_dir = os.path.join(base_dir, elemento, 'dorso')
            
            if not os.path.exists(frente_dir):
                print(f'Directory {frente_dir} does not exist.')
                continue
            
            for img_name in os.listdir(frente_dir):
                img_id_str, ext = os.path.splitext(img_name)

                try:
                    img_id = int(img_id_str)
                except ValueError:
                    print(f'Skipped non-numeric file: {img_name}')
                    continue

                img_frente_path = os.path.join(frente_dir, img_name)
                img_dorso_path = os.path.join(dorso_dir, img_name)
                
                carta = Carta.query.get(img_id)
                if carta:
                    
                    if (carta.imagen_frente != load_image_as_binary(img_frente_path)) or (carta.imagen_dorso != load_image_as_binary(img_dorso_path)):
                        carta.imagen_frente = load_image_as_binary(img_frente_path)
                        carta.imagen_dorso = load_image_as_binary(img_dorso_path)
                        db.session.commit()
                        print(f'Updated carta {carta.id} with images {img_name}')

if __name__ == "__main__":
    update_images()
