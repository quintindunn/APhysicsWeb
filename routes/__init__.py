import flask

from .home import home


def register_routes(app: flask.Flask):
    for blueprint, prefix in routes:
        if len(prefix):
            app.register_blueprint(blueprint, url_prefix=prefix)
        else:
            app.register_blueprint(blueprint)


routes = [
    (home, "")
]
