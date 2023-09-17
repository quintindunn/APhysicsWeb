from flask import Blueprint, render_template

vector2d = Blueprint("vector2d", __name__)


@vector2d.route("/")  # http://localhost/2dvectors/
async def index():
    return render_template("vector2d/index.html")


@vector2d.route("/2dcalculator")  # http://localhost/2dvectors/2dcalculator
def vector_addition_calculator():
    return render_template("vector2d/vector_addition_calculator.html")

