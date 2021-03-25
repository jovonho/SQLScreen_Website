from flask import Flask
from config import Config
from dbhandler import DbHandler
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
db = DbHandler()

login = LoginManager(app)
login.login_view = "login"

from app import routes