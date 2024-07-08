# Dominio Elemental - Trabajo práctico integrador IDS

## Sofia Belen Rivas (112216)
## Natasha Petriw (112377)
## Conrado Garcia Palau (111775)

Para el presente trabajo se ha tomado como idea principal la realización de un juego del estilo "gachapón", en el cual el usuario ganará monedas al jugar diversos minijuegos que posteriormente podrá gastar en la tienda al comprar sobres de cartas. El rol principal de las mismas es el de formar parte de un "álbum" cuyo destino es ser completado por el jugador, siendo este el principal propósito de la página.

#### Frontend
El frontend está diseñado sin depender de frameworks, utilizando HTML para estructurar el contenido de la página. CSS se emplea para diseñar la interfaz de manera acorde a la temática mítica y retro del juego, mientras que JavaScript se utiliza para manejar la lógica del lado del cliente y la integración con el backend, incluyendo la actualización dinámica de datos y la representación gráfica de tablas en la interfaz.

#### Backend
En el backend, hacemos uso de CORS para gestionar las solicitudes entre dominios, asegurando una comunicación segura y permitida entre el frontend y el backend. Utilizamos PostgreSQL como nuestra base de datos principal para crear y gestionar tablas que almacenan información crítica del juego, como cartas y usuarios. Utilizamos métodos HTTP como GET, POST, y otros para realizar diversas operaciones: actualizamos dinámicamente el saldo del usuario según sus acciones en el juego, almacenamos la información proporcionada en formularios de contacto, facilitamos la compra de cartas y las agregamos a la colección del usuario en la base de datos. Además, gestionamos la obtención de todas las cartas que posee un usuario para mostrarlas gráficamente en la interfaz del juego.

#### BDD / Backend
Este proyecto utiliza SQLAlchemy con Flask para gestionar la base de datos, que incluye tres modelos principales interrelacionados. El modelo Carta representa cada carta del juego y contiene atributos como el nombre, elemento y poder de cada carta. Cada usuario está representado por el modelo Usuario, que guarda información como el nombre del jugador y la cantidad de monedas que tiene. La relación entre usuarios y cartas se gestiona a través del modelo CartasUsuario, que funciona como una tabla intermedia. Esta tabla registra qué cartas posee cada usuario, indicando la cantidad específica de cada carta. Utilizando claves foráneas, CartasUsuario establece relaciones con los modelos Usuario y Carta, permitiendo que, en caso de haber más de un usuario, cada usuario pueda tener múltiples cartas y que cada carta pueda pertenecer a múltiples usuarios.

#### Requerimientos
Para ejecutar este proyecto localmente, asegúrate de tener instalado lo siguiente:

- **Python:** 3.10.12
- **Flask:** 3.0.3
- **Flask-Cors:** 4.0.1
- **SQLAlchemy:** 2.0.31
- **Psycopg2-binary:** 2.9.9

  ```bash
  pip install Flask==3.0.3
  pip install SQLAlchemy==2.0.31
  pip install psycopg2-binary==2.9.9
  pip install Flask-Cors==4.0.1

Además, no te olvides de configurar un usuario PostgreSQL que cumpla con lo estipulado en config.py. Recomendamos también el uso de un venv, que en caso de no tenerlo lo podes instalar de la siguiente manera

```bash
#Instala el paquete para gestionar entornos virtuales si todavía no lo tenes
python3 -m pip install virtualenv

# Crear un nuevo entorno virtual
python3 -m venv venv

# Ejecuta este comando donde hayas instalado el venv para activarlo
source myenv/bin/activate
