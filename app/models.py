from app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, index=True, unique=True)
    email = db.Column(db.String(120), nullable=False, index=True, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    firstname = db.Column(db.String(64), nullable=False)
    lastname = db.Column(db.String(64))
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # Not an actual db field.
    saved_queries = db.relationship("SavedQuery", backref="author", lazy="dynamic")

    def __repr__(self):
        return "<User {}:\n\tid: {}\n\temail: {}\n\tfirstname {}\n\tlastname {}>".format(
            self.username, self.id, self.email, self.firstname, self.lastname
        )


class SavedQuery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False, index=True, unique=True)
    query = db.Column(db.Text, nullable=False)
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<SavedQuery {}>".format(self.query)


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.Text, index=True)
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
    __typename = db.Column(db.Text)
    __table_args__ = (db.UniqueConstraint("symbol", "name", name="quotes_symbol_name_key"),)
