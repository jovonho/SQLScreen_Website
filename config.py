import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "you-will-never-guess"
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URL")
        or "postgresql://postgres:postgresql12345$$@localhost:5432/tmx"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Email Config
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "loic.hovon@gmail.com"
    MAIL_PASSWORD = "kvbuglsgyprwgchc"
    ADMINS = ["loic.hovon@gmail.com"]
    SCHEDULER_URL = "http://127.0.0.1:3000"
    SCHEDULER_JOB_ENDPOINT = "/scheduler/jobs"
