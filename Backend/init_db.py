from app import app, db
from models import Usuario, Carta
from sqlalchemy.exc import IntegrityError

with app.app_context():
    db.create_all()

    if Usuario.query.filter_by(nombre='Demo').first() is None:
        usuario_demo = Usuario(nombre='Demo', plata=30)
        db.session.add(usuario_demo)

    if Carta.query.count() == 0:
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

        for id_, nombre, elemento, poder in data:
            db.session.add(Carta(id=id_, nombre=nombre, elemento=elemento, poder=poder))

    try:
        db.session.commit()
        print("Base de datos inicializada correctamente.")
    except IntegrityError as e:
        db.session.rollback()
        print("Error al insertar datos:", str(e))
