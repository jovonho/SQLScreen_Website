from os import write
import re

from app.email import send_password_reset_email
from sqlalchemy.orm import query
from app import app, db
from app.models import User, SavedQuery
from app.forms import (
    RegistrationForm,
    EditProfileForm,
    LoginForm,
    SaveQueryForm,
    EditSavedQuery,
    ResetPasswordRequestForm,
    ResetPasswordForm,
)
from datetime import datetime, time
from flask.globals import current_app
from flask.helpers import send_file
from flask_login.utils import login_required
from flask import render_template, request, make_response, flash, redirect, url_for, abort
from flask_login import current_user, login_user, logout_user
import simplejson as json
from werkzeug.urls import url_parse
import csv
from sqlalchemy.exc import IntegrityError


@app.route("/")
@app.route("/index")
def index():
    # flash("NASDAQ stonks coming soon!")
    return render_template("index.html", index=True)


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    form = RegistrationForm()
    if form.validate_on_submit():
        newuser = User(
            username=form.username.data,
            email=form.email.data,
            firstname=form.firstname.data,
            lastname=form.lastname.data,
        )
        newuser.set_password(form.password.data)
        try:
            db.session.add(newuser)
            db.session.commit()
            flash("Congratulations, you are now a registered user!")
            return redirect(url_for("login"))
        except Exception as e:
            print(e)
            flash("Could not register. Try again.")
            return redirect(url_for("register"))

    return render_template("register.html", title="Register", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    form = LoginForm()
    # We are in the case of login form submission
    if form.validate_on_submit():

        user = User.get_by_username(form.username.data)
        next = request.args.get("next")

        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            print("return on err url: ", form.return_on_error_url.data)

            if form.return_on_error_url.data:
                return redirect(form.return_on_error_url.data)
            return redirect(url_for("login"))

        login_user(user, remember=form.remember_me.data)

        if not next or url_parse(next).netloc != "":
            next = url_for("index")
        # elif next == "/save_query":
        #     # Since we don't have the username yet when trying to save a query without being logged in
        #     next = "/save_query"

        return redirect(next)

    return render_template("login.html", form=form)


@app.route("/save_query", methods=["POST"])
@login_required
def save_query():

    print(request.form)

    form = SaveQueryForm()

    # Fills with default values
    query = SavedQuery(
        title=form.query_to_save.data,
        query=form.query_to_save.data,
        run_frequency="daily",
        username=current_user.username,
    )
    print(f"Query to save: {query}")

    if form.validate_on_submit():
        current_user.saved_queries.append(query)
        db.session.commit()
        flash("Please review the default frequency and run time of your query.")

    return redirect(
        url_for("edit_query", username=current_user.username, query_where_clause=query.query)
    )


@app.route("/<username>/edit_query/<query_where_clause>", methods=["GET", "POST"])
@login_required
def edit_query(username, query_where_clause):

    saved_query = (
        db.session.query(SavedQuery)
        .join(User)
        .filter(SavedQuery.username == username, SavedQuery.query == query_where_clause)
        .first()
    )
    print(saved_query)

    form = EditSavedQuery()
    form.name.data = saved_query.title
    form.query_to_save.data = saved_query.query
    form.run_time.data = saved_query.run_time
    form.run_day.data = saved_query.run_day
    form.run_frequency.data = saved_query.run_frequency

    return render_template("edit_query.html", form=form)


@app.route("/user/<username>")
@login_required
def user(username):
    if username != current_user.username:
        b = username != current_user.username
        print(b)
        return redirect("/user/" + current_user.username)
    user = User.get_by_username(username)
    if user is not None:
        # TODO: Fetch real saved queries from the database
        saved_queries = user.saved_queries

        return render_template(
            "user.html", user=user, saved_queries=saved_queries, profilepage=True
        )
    abort(404)


# Called by js to lazy load query results
@app.route("/load", methods=["POST"])
def load():
    data = request.json
    query_where_clause = data["sql"]
    limit = data["limit"]
    offset = data["offset"]
    sortby = data["sortby"]
    sortorder = data["sortorder"]

    # query_where_clause = (
    #     "symbol in ('CEE', 'FOUR', 'HMM.A', 'MCS', 'RBX', 'TAL', 'VCI',  'AAB', 'AAV', 'AC', 'ACB')"
    # )

    print("Received data: " + query_where_clause)

    fields = """symbol, name, sector, industry, exshortname, price, pricechange, percentchange, openprice, prevclose, dayhigh, 
        daylow, weeks52high, weeks52low, day21movingavg, day50movingavg, day200movingavg, volume, averagevolume10d, averagevolume30d, 
        averagevolume50d, shareoutstanding, marketcap, totalsharesoutstanding, marketcapallclasses, sharesescrow, 
        alpha, beta, eps, peratio, pricetobook, pricetocashflow, returnonequity, returnonassets, totaldebttoequity, vwap, 
        dividendfrequency, dividendyield, dividendamount, dividendcurrency, exdividenddate, dividendpaydate, lastupdate, dividend3Years, dividend5Years"""

    query = f"select {fields} from quote where {query_where_clause} order by {sortby} {sortorder} limit {limit} offset {offset};"

    # TODO: What is the best practice here? Should the app have a single connection or every call generate its own?
    query_result = db.session.execute(query)

    json_result = json.dumps(query_result.all(), default=str, use_decimal=True)
    print(len(json_result))

    return make_response(json_result, 200)


# Endpoint called when query is submitted.
@app.route("/results", methods=["GET", "POST"])
def submit_query():

    query_where_clause = request.args.get("q")

    query = f"select count(*) from quote where {query_where_clause};"

    # TODO: What is the best practice here? Should the app have a single connection or every call generate its own?
    num_results = db.session.execute(query)
    print(num_results)

    save_query_form = SaveQueryForm()
    save_query_form.query_to_save.data = query_where_clause

    loginform = LoginForm()
    loginform.return_on_error_url.data = url_for(request.endpoint, **request.args)

    return render_template(
        "results.html",
        query=query_where_clause,
        num_results=num_results.first(),
        results=True,
        savequeryform=save_query_form,
        loginform=loginform,
    )


@app.route("/edit_profile", methods=["GET", "POST"])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username, email=current_user.email)
    if form.validate_on_submit():
        if form.username.data is not None:
            current_user.username = form.username.data
        if form.email.data is not None:
            current_user.email = form.email.data
        if form.firstname.data is not None:
            current_user.firstname = form.firstname.data
        if form.lastname.data is not None:
            current_user.lastname = form.lastname.data
        try:
            db.session.commit()
            flash("Your changes have been saved.")
            return redirect(url_for("user", username=current_user.username))
        except IntegrityError as e:
            db.session.rollback()
            pattern = re.compile(r"DETAIL:\s+Key\s+\((\w+)\)=\((\w+)\)\s(.*)\.")
            matches = re.search(pattern, str(e.orig))
            print(matches.group(0))
            flash(f"Error: {matches.group(1)} {matches.group(2)} {matches.group(3)}")
            return render_template(
                "edit_profile.html", title="Edit Profile", form=form, editprofile=True
            )

    elif request.method == "GET":
        form.username.data = current_user.username
        form.email.data = current_user.email
        form.firstname.data = current_user.firstname
        form.lastname.data = current_user.lastname
    return render_template("edit_profile.html", title="Edit Profile", form=form, editprofile=True)


@app.route("/reset_password_request", methods=["GET", "POST"])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for("index"))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_password_reset_email(user)
        flash("Check your email for the instructions to reset your password")
        return redirect(url_for("login"))
    return render_template("reset_pw_request.html", title="Reset Password", form=form)


@app.route("/reset_password/<token>", methods=["GET", "POST"])
def reset_password(token):
    if current_user.is_authenticated:
        print("current user authenticated")
        return redirect(url_for("index"))
    user = User.verify_reset_password_token(token)
    if not user:
        print("user not found")
        return redirect(url_for("index"))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash("Your password has been reset.")
        return redirect(url_for("login"))
    return render_template("reset_password.html", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))


# Update user last_seen
@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()


# TODO Limit results to 100 lines for non-users
@app.route("/exportcsv", methods=["POST"])
def export_csv():
    query_where_clause = request.json.get("query")
    sortby = request.json.get("sortby")
    sortorder = request.json.get("sortorder")

    fields = """ symbol, name, sector, industry, exshortname, price, pricechange, percentchange, price, openprice, prevclose, dayhigh, 
        daylow, weeks52high, weeks52low, day21movingavg, day50movingavg, day200movingavg, volume, averagevolume10d, averagevolume30d, 
        averagevolume50d, shareoutstanding, marketcap, totalsharesoutstanding, marketcapallclasses, sharesescrow, 
        alpha, beta, eps, peratio, pricetobook, pricetocashflow, returnonequity, returnonassets, totaldebttoequity, vwap, 
        dividendfrequency, dividendyield, dividendamount, dividendcurrency, exdividenddate, dividendpaydate, lastupdate """

    query = f"select {fields} from quote where {query_where_clause} order by {sortby} {sortorder};"

    # TODO: What is the best practice here? Should the app have a single connection or every call generate its own?
    query_result = db.session.execute(query)

    fieldnames = [
        "symbol",
        "name",
        "sector",
        "industry",
        "exshortname",
        "price",
        "pricechange",
        "percentchange",
        "price",
        "openprice",
        "prevclose",
        "dayhigh",
        "daylow",
        "weeks52high",
        "weeks52low",
        "day21movingavg",
        "day50movingavg",
        "day200movingavg",
        "volume",
        "averagevolume10d",
        "averagevolume30d",
        "averagevolume50d",
        "shareoutstanding",
        "marketcap",
        "totalsharesoutstanding",
        "marketcapallclasses",
        "sharesescrow",
        "alpha",
        "beta",
        "eps",
        "peratio",
        "pricetobook",
        "pricetocashflow",
        "returnonequity",
        "returnonassets",
        "totaldebttoequity",
        "vwap",
        "dividendfrequency",
        "dividendyield",
        "dividendamount",
        "dividendcurrency",
        "exdividenddate",
        "dividendpaydate",
        "lastupdate",
    ]

    filename = "query_result" + datetime.utcnow() + ".csv"

    with open("./app/generated/" + filename, "w", newline="") as csvfile:
        writer = csv.writer(csvfile, delimiter=",", quotechar='"')
        writer.writerow("sep=,")
        writer.writerow(fieldnames)

        for row in query_result.all():
            print(row)
            writer.writerow(
                [
                    row.symbol,
                    row.name,
                    row.sector,
                    row.industry,
                    row.exshortname,
                    row.price,
                    row.pricechange,
                    row.percentchange,
                    row.price,
                    row.openprice,
                    row.prevclose,
                    row.dayhigh,
                    row.daylow,
                    row.weeks52high,
                    row.weeks52low,
                    row.day21movingavg,
                    row.day50movingavg,
                    row.day200movingavg,
                    row.volume,
                    row.averagevolume10d,
                    row.averagevolume30d,
                    row.averagevolume50d,
                    row.shareoutstanding,
                    row.marketcap,
                    row.totalsharesoutstanding,
                    row.marketcapallclasses,
                    row.sharesescrow,
                    row.alpha,
                    row.beta,
                    row.eps,
                    row.peratio,
                    row.pricetobook,
                    row.pricetocashflow,
                    row.returnonequity,
                    row.returnonassets,
                    row.totaldebttoequity,
                    row.vwap,
                    row.dividendfrequency,
                    row.dividendyield,
                    row.dividendamount,
                    row.dividendcurrency,
                    row.exdividenddate,
                    row.dividendpaydate,
                    row.lastupdate,
                ]
            )

    filepath = "generated/" + filename

    try:
        return send_file(filepath, attachment_filename=filename)
    except Exception as e:
        return str(e)


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
