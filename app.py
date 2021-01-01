from flask import Flask, render_template, request
from dbhandler import DbHandler

# from babel import Locale
import babel
import babel.dates

app = Flask(__name__)
app.db = DbHandler()
# babel.dates.LC_TIME = Locale.parse("en_US")


@app.route("/")
def index():
    return render_template("index.html")


# @app.route("/submit-query", methods=["POST"])
@app.route("/submit")
def submit_query():
    print(request.form)

    # query_where_clause = "symbol in ('MRG.DB.A', 'NWH.DB.G', 'IAF.PR.I', 'XIT')"
    query_where_clause = "industry = 'Oil & Gas'"

    query = "select * from quotes where " + query_where_clause + ";"

    # TODO: Not generating a connection for each query is probably a tiny bit faster
    query_result = app.db.execute_self_contained(query)

    # TODO: See ways to speed up large queries

    for k, v in query_result[0].items():
        print(f" {k}: {v}")

    # TODO: how to best present results? Take into account the terms the user looked for and display these first, order by what?
    # for res in query_result:
    # if res["percentchange"][0] == "-":
    #     #     print(type(res))
    #     for k, v in res.items():
    #         print(f" {k}: {v}")

    return render_template("query-result.html", query=query, query_result=query_result)


@app.template_filter()
def format_datetime(value, format="date_only"):
    if format == "date_only":
        format = "y-MM-dd"
    elif format == "all":
        format = "EE dd.MM.y HH:mm"
    return babel.dates.format_datetime(value, format, locale="en_US")


@app.context_processor
def utility_processor():
    def format_change(change):
        return "{:+.2f}".format(change)

    def format_2_decimals(change):
        if change is None or change == 0:
            return "-"
        return "{:.2f}".format(change)

    def format_comma(amount):
        if amount is None or amount == 0:
            return "-"
        return "{:,}".format(amount)

    def format_price(price):
        if price is None:
            return "-"
        return "{:.2f}".format(price)

    def not_none(s):
        if s is None:
            return "-"
        return s

    def abbreviate(x):
        if x is None:
            return "-"
        abbreviations = ["", "K", "M", "B", "T"]
        base = "1"
        i = 0
        while len(base) < len(str(x)) - 3:
            base += "000"
            i += 1
        base = round(x / int(base), 2)
        return str(base) + abbreviations[i]

    def format_financial(x):
        if x is None:
            return "-"
        # return str(round(x, 4))
        return "{:.4f}".format(x).rstrip("0").rstrip(".")

    def format_divi_date(date):
        if date is not None:
            return date.strftime("%Y-%m-%d")
        return date

    return dict(
        format_change=format_change,
        format_2_decimals=format_2_decimals,
        format_comma=format_comma,
        format_price=format_price,
        not_none=not_none,
        abbreviate=abbreviate,
        format_financial=format_financial,
        format_divi_date=format_divi_date,
    )
