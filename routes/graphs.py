"""
authors: Quintin Dunn, Zeke Mccrary
date: 9/19/23
description: Routes for graphs
"""


from flask import Blueprint, render_template

graphs = Blueprint("graphs", __name__)


@graphs.route("/")  # http://localhost/graphs/
async def index():
    """
    Main page for vectors, url: http://localhost/graphs/
    :return:
    """
    return render_template("graphs/index.html")


@graphs.route("/dva/")  # http://localhost/graphs/dva
def dva_graphs():
    """
    VT DT AT graphing, url: http://localhost/graphs/dva
    :return:
    """
    return render_template("graphs/dva_graphs.html")
