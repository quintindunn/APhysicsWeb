"""
authors: Quintin Dunn, Zeke Mccrary
date: 9/16/23
description: Routes for home
"""

from flask import Blueprint, render_template

home = Blueprint("home", __name__)


@home.route("/")
async def index():
    """
    Main home page.
    :return: render_template
    """
    return render_template("home/index.html")
