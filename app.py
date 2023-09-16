from flask import Flask
from routes import register_routes
import config


from routes import routes

app = Flask(__name__)

# REGISTER CONFIG SETTINGS
app.secret_key = config.FLASK_SECRET


# Register routes
register_routes(app)


if __name__ == '__main__':
    app.run(host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.FLASK_DEBUG)
