from app.util import Weekday, RunFrequency
from sqlalchemy.sql.sqltypes import Date, Enum
from app import app, db, login
from datetime import date, datetime, time
from time import time as time2
from flask_login import UserMixin
from sqlalchemy import Time
from hashlib import md5
from werkzeug.security import generate_password_hash, check_password_hash
import jwt


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, index=True, unique=True)
    email = db.Column(db.String(120), nullable=False, index=True, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    firstname = db.Column(db.String(64))
    lastname = db.Column(db.String(64))
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    # Not an actual db field.
    saved_queries = db.relationship("SavedQuery", backref="author", lazy="dynamic")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def avatar(self, size):
        digest = md5(self.email.lower().encode("utf-8")).hexdigest()
        return f"https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}"

    def get_reset_password_token(self, expires_in=600):
        print(f"time: {time2()}")
        return jwt.encode(
            {"reset_password": self.id, "exp": time2() + expires_in},
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])["reset_password"]
        except Exception as e:
            print(f"Could not decode JWT: {e}")
            return
        return User.query.get(id)

    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def __repr__(self):
        return "<User {}:\n\tid: {}\n\temail: {}\n\tfirstname {}\n\tlastname {}>".format(
            self.username, self.id, self.email, self.firstname, self.lastname
        )


class SavedQuery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.String, nullable=False)
    title = db.Column(db.String(120), nullable=False, index=True)
    query = db.Column(db.Text, nullable=False)
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # Used to form the cron config
    year = db.Column(db.String(30))
    month = db.Column(db.String(30))
    day = db.Column(db.String(30))
    week = db.Column(db.String(30))
    day_of_week = db.Column(db.String(30))
    hour = db.Column(db.String(30))
    minute = db.Column(db.String(30))
    second = db.Column(db.String(30))
    username = db.Column(db.String, db.ForeignKey("user.username"), nullable=False)
    __table_args__ = (
        db.UniqueConstraint(
            "username",
            "query",
            "year",
            "month",
            "day",
            "hour",
            "minute",
            name="key_unique_user_query_time",
        ),
    )

    def __repr__(self):
        return "<SavedQuery {}>".format(self.query)

    @classmethod
    def get_all_by_username(cls, username):
        return cls.query.filter_by(username=username).all()

    @classmethod
    def get_by_username_and_query(cls, username, query):
        return cls.query.filter_by(username=username, query=query).all()


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.Text, unique=True, index=True)
    name = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric)
    pricechange = db.Column(db.Numeric)
    percentchange = db.Column(db.Numeric)
    exchangename = db.Column(db.Text)
    exshortname = db.Column(db.Text)
    exchangecode = db.Column(db.Text)
    marketplace = db.Column(db.Text)
    sector = db.Column(db.Text)
    industry = db.Column(db.Text)
    volume = db.Column(db.BigInteger)
    openprice = db.Column(db.Numeric)
    dayhigh = db.Column(db.Numeric)
    daylow = db.Column(db.Numeric)
    marketcap = db.Column(db.BigInteger)
    marketcapallclasses = db.Column(db.BigInteger)
    peratio = db.Column(db.Numeric)
    prevclose = db.Column(db.Numeric)
    dividendfrequency = db.Column(db.Text)
    dividendyield = db.Column(db.Numeric)
    dividendamount = db.Column(db.Numeric)
    dividendcurrency = db.Column(db.Text)
    beta = db.Column(db.Numeric)
    eps = db.Column(db.Numeric)
    exdividenddate = db.Column(db.DateTime)
    shortdescription = db.Column(db.Text)
    longdescription = db.Column(db.Text)
    website = db.Column(db.Text)
    email = db.Column(db.Text)
    phonenumber = db.Column(db.Text)
    fulladdress = db.Column(db.Text)
    employees = db.Column(db.Integer)
    shareoutstanding = db.Column(db.BigInteger)
    totaldebttoequity = db.Column(db.Numeric)
    totalsharesoutstanding = db.Column(db.BigInteger)
    sharesescrow = db.Column(db.BigInteger)
    vwap = db.Column(db.Numeric)
    dividendpaydate = db.Column(db.DateTime)
    weeks52high = db.Column(db.Numeric)
    weeks52low = db.Column(db.Numeric)
    alpha = db.Column(db.Numeric)
    averagevolume10d = db.Column(db.BigInteger)
    averagevolume30d = db.Column(db.BigInteger)
    averagevolume50d = db.Column(db.BigInteger)
    pricetobook = db.Column(db.Numeric)
    pricetocashflow = db.Column(db.Numeric)
    returnonequity = db.Column(db.Numeric)
    returnonassets = db.Column(db.Numeric)
    day21movingavg = db.Column(db.Numeric)
    day50movingavg = db.Column(db.Numeric)
    day200movingavg = db.Column(db.Numeric)
    dividend3years = db.Column(db.Numeric)
    dividend5years = db.Column(db.Numeric)
    datatype = db.Column(db.Text)
    typename = db.Column(db.Text)
    suspended = db.Column(db.Boolean, default=False)
    lastupdate = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint("symbol", "name", name="quotes_symbol_name_key"),)
