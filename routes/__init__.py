"""
authors: Quintin Dunn, Zeke Mccrary
date: 9/16/23
description: Defines the routes for all the modules.
"""

import flask

from .home import home
from .vector2d import vector2d


def register_routes(app: flask.Flask):
    """
    Iterates through the defined routes and register them on the app.
    :param app: flask.Flask object to register the blueprints on
    :return: None
    """
    for blueprint, prefix in routes:
        if len(prefix) > 0:
            app.register_blueprint(blueprint, url_prefix=prefix)
        else:
            app.register_blueprint(blueprint)


routes = [
    (home, ""),
    (vector2d, "/2dvectors")
]
