from flask import Flask, render_template, request
from dbhandler import DbHandler

app = Flask(__name__)
app.db = DbHandler()


@app.route("/")
def index():
    # return render_template("results.html")
    return render_template("index.html")


@app.route("/submit-query", methods=["POST"])
def submit_query():
    print(request.form)
    query_where_clause = request.form["sql"]

    query = "select * from quotes where " + query_where_clause + ";"
    print(query)

    # TODO: Not generating a connection for each query is probably a tiny bit faster
    query_result = app.db.execute_self_contained(query)

    # TODO: See ways to speed up large queries

    # TODO: how to best present results? Take into account the terms the user looked for and display these first, order by what?
    for res in query_result:
        #     print(type(res))
        for k, v in res.items():
            print(f" {k}: {v}")

    return render_template("query-result.html", query=query, query_result=query_result)
