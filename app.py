from flask import Flask, render_template, request, make_response
from dbhandler import DbHandler
import simplejson as json

app = Flask(__name__)
app.db = DbHandler()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/load", methods=["POST"])
def load():
    data = request.json
    query_where_clause = data["sql"]
    limit = data["limit"]
    offset = data["offset"]
    order_by = data["orderBy"]

    print("Received data: " + query_where_clause)

    # query_where_clause = "symbol in ('CEE', 'FOUR', 'HMM.A', 'MCS')"
    # query_where_clause = (
    #     "symbol in ('CEE', 'FOUR', 'HMM.A', 'MCS', 'RBX', 'TAL', 'VCI',  'AAB', 'AAV', 'AC', 'ACB')"
    # )

    fields = """ symbol, name, sector, industry, exshortname, price, pricechange, percentchange, price, openprice, prevclose, dayhigh, 
        daylow, weeks52high, weeks52low, day21movingavg, day50movingavg, day200movingavg, volume, averagevolume10d, averagevolume30d, 
        averagevolume50d, shareoutstanding, marketcap, totalsharesoutstanding, marketcapallclasses, sharesescrow, 
        alpha, beta, eps, peratio, pricetobook, pricetocashflow, returnonequity, returnonassets, totaldebttoequity, vwap, 
        dividendfrequency, dividendyield, dividendamount, dividendcurrency, exdividenddate, dividendpaydate """

    query = f"select {fields} from quotes where {query_where_clause} order by {order_by} limit {limit} offset {offset};"

    # TODO: What is the best practice here? Should the app have a single connection or every call generate its own?
    query_result = app.db.execute_self_contained(query)

    json_result = json.dumps(query_result, default=str, use_decimal=True)
    print(len(json_result))

    return make_response(json_result, 200)


@app.route("/results", methods=["GET", "POST"])
def submit_query():
    print(request.headers)

    # We could use GET or POST here
    # sql = request.form["sql"]
    # query = base64.b64encode(bytes(request.args.get("q"), encoding="utf-8"))
    query = request.args.get("q")
    # query = "symbol in ('CRDL.WT', 'TRL.WT', 'BXR', 'EKG', 'LRT.UN', 'BDGC', 'CUF.UN', 'ARTG', 'AGF.B', 'ABX', 'CSAV')"2

    return render_template("query-result.html", query=query)


@app.route("/submit-query", methods=["GET"])
def submit_query_old():

    query_where_clause = "symbol in ('CRDL.WT', 'TRL.WT', 'BXR', 'EKG', 'LRT.UN', 'AGF.B')"

    fields = """ symbol, name, sector, industry, exshortname, price, pricechange, percentchange, price, openprice, prevclose, dayhigh,
        daylow, weeks52high, weeks52low, day21movingavg, day50movingavg, day200movingavg, volume, averagevolume10d, averagevolume30d,
        averagevolume50d, shareoutstanding, marketcap, totalsharesoutstanding, marketcapallclasses, sharesescrow,
        alpha, beta, eps, peratio, pricetobook, pricetocashflow, returnonequity, returnonassets, totaldebttoequity, vwap,
        dividendfrequency, dividendyield, dividendamount, dividendcurrency, exdividenddate, dividendpaydate """

    query = f"select {fields} from quotes where {query_where_clause};"

    query_result = app.db.execute_self_contained(query)

    return render_template("query-result_old.html", query=query, query_result=query_result)


@app.context_processor
def utility_processor():
    def get_symbol(change):
        if change < 0:
            return "-"
        else:
            return "+"

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
