from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from dbhandler import DbHandler
from app import login
from hashlib import md5
from datetime import datetime


class NoUserIdError(Exception):
    pass


@login.user_loader
def load_user(id):
    return User.get_by_id(id)


class User(UserMixin):
    db = DbHandler()

    def __init__(
        self, username=None, email=None, firstname=None, lastname=None, password_hash=None
    ):
        self.id = None
        self.username = username
        self.email = email
        self.created = None
        self.firstname = firstname
        self.lastname = lastname
        self.password_hash = password_hash

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def create(self):
        res = self.db.exec_self_contained(
            "INSERT INTO users (username, email, firstname, lastname, password_hash) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (
                self.username,
                self.email,
                datetime.utcnow(),
                self.firstname,
                self.lastname,
                self.password_hash,
            ),
        )
        if len(res) != 0:
            id = res[0][0]
            self.id = id
            print(f"Successfully created user with id {id}")

    def save(self):
        if self.id is not None:
            res = self.db.exec_self_contained(
                "UPDATE users SET username=%s, email=%s, firstname=%s, lastname=%s, password_hash=%s WHERE id=%s RETURNING id",
                (
                    self.username,
                    self.email,
                    self.firstname,
                    self.lastname,
                    self.password_hash,
                    self.id,
                ),
            )
            if len(res) != 0:
                print(f"Successfully updated user id {res[0][0]}")
        else:
            raise NoUserIdError(
                f"User {self.username} ({self.firstname}, {self.lastname}, {self.email}) has no ID."
            )

    def avatar(self, size):
        digest = md5(self.email.lower().encode("utf-8")).hexdigest()
        return f"https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}"

    @classmethod
    def get_by_id(self, id):

        sql = "SELECT id, username, email, firstname, lastname, password_hash FROM users WHERE id = %s"
        res = self.db.exec_self_contained(sql, (id,))

        if res is not None and len(res) > 0:
            res = res[0]
            u = User()
            u.id, u.username, u.email, u.firstname, u.lastname, u.password_hash = (
                res[0],
                res[1],
                res[2],
                res[3],
                res[4],
                res[5],
            )
            return u

        return None

    @classmethod
    def get_by_username(self, username):
        sql = "SELECT id, username, email, firstname, lastname, password_hash FROM users WHERE username = %s"
        res = self.db.exec_self_contained(sql, (username,))

        if res is not None and len(res) > 0:
            res = res[0]
            u = User()
            u.id, u.username, u.email, u.firstname, u.lastname, u.password_hash = (
                res[0],
                res[1],
                res[2],
                res[3],
                res[4],
                res[5],
            )
            return u

        return None

    @classmethod
    def get_by_email(self, email):
        sql = "SELECT id, username, email, firstname, lastname, password_hash FROM users WHERE email = %s"
        res = self.db.exec_self_contained(sql, (email,))

        if res is not None and len(res) > 0:
            res = res[0]
            u = User()
            u.id, u.username, u.email, u.firstname, u.lastname, u.password_hash = (
                res[0],
                res[1],
                res[2],
                res[3],
                res[4],
                res[5],
            )
            return u

        return None

    def __repr__(self):
        return f"<User {self.username}, {self.email}, {self.firstname}, {self.lastname}>"
