from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/submit-query", methods=['POST'])
def submit_query():
    print(request.form)
    query = request.form['sql']
    # print(query)
    return render_template('result.html', query=query)
