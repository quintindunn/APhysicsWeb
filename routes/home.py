from flask import Blueprint, render_template

home = Blueprint("home", __name__)


@home.route("/")
async def index():
    return render_template("home/index.html")
