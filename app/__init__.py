from flask import Flask
from config import Config
from dbhandler import DbHandler

app = Flask(__name__)
app.config.from_object(Config)
app.db = DbHandler()

from app import routes