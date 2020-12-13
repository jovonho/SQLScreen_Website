from flask import Flask, render_template, request
from dbhandler import DbHandler

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit-query", methods=["POST"])
def submit_query():
    print(request.form)
    query_where_clause = request.form["sql"]

    query = "select * from quotes where " + query_where_clause + ";"
    print(query)

    db = DbHandler()
    query_result = db.execute_self_contained(query)
    print(query_result)

    return render_template("result.html", query=query_result)
