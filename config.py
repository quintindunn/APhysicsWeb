"""
authors: Quintin Dunn, Zeke Mccrary
date: 9/16/23
description: Configuration file for the app.
"""
import os

FLASK_DEBUG = True
FLASK_PORT = 5000

if os.path.isfile("FLASK_SECRET.key"):
    with open("FLASK_SECRET.key", 'rb') as f:
        FLASK_SECRET = f.read()
else:
    FLASK_SECRET = b'CHANGE ME'
FLASK_HOST = "localhost"
