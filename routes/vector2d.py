"""
authors: Quintin Dunn, Zeke Mccrary
date: 9/16/23
description: Routes for 2d vectors
"""


from flask import Blueprint, render_template

vector2d = Blueprint("vector2d", __name__)


@vector2d.route("/")  # http://localhost/2dvectors/
async def index():
    """
    Main page for vectors, url: http://localhost/2dvectors/
    :return:
    """
    return render_template("vector2d/index.html")


@vector2d.route("/2dcalculator")  # http://localhost/2dvectors/2dcalculator
def vector_addition_calculator():
    """
    Multi-vector addition calculator, url: http://localhost/2dvectors/2dcalculator
    :return:
    """
    return render_template("vector2d/vector_addition_calculator.html")
