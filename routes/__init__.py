import flask

from .home import home
from .vector2d import vector2d


def register_routes(app: flask.Flask):
    for blueprint, prefix in routes:
        if len(prefix):
            app.register_blueprint(blueprint, url_prefix=prefix)
        else:
            app.register_blueprint(blueprint)


routes = [
    (home, ""),
    (vector2d, "/2dvectors")
]
