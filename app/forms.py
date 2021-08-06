from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField, PasswordField, BooleanField, SubmitField
from wtforms.validators import (
    ValidationError,
    DataRequired,
    Email,
    EqualTo,
    InputRequired,
    Length,
    Required,
)
from app.models import User


class ResetPasswordRequestForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    submit = SubmitField("Request Password Reset")


class ResetPasswordForm(FlaskForm):
    password = PasswordField("Password", validators=[DataRequired()])
    password2 = PasswordField("Repeat Password", validators=[DataRequired(), EqualTo("password")])
    submit = SubmitField("Request Password Reset")


class SaveQueryForm(FlaskForm):
    query_to_save = HiddenField("Query to Save", validators=[InputRequired()])
    submit = SubmitField("Save Query    ")


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Sign In")


class RegistrationForm(FlaskForm):
    # TODO: Min passsword length enforcement
    username = StringField("Username", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email()])
    firstname = StringField("First Name", validators=[InputRequired()])
    lastname = StringField("Last Name", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=8, max=64)])
    password2 = PasswordField("Repeat Password", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Register")

    # When you add any methods that match the pattern validate_<field_name>,
    # WTForms takes those as custom validators and invokes them in addition to the stock validators.

    def validate_username(self, username):
        user = User.get_by_username(username.data)
        if user is not None:
            raise ValidationError("Username taken.")

    def validate_email(self, email):
        user = User.get_by_email(email.data)
        if user is not None:
            raise ValidationError("Email already registered.")

    # def validate_password(self, password):
    #     if len(password) < 7:
    #         raise ValidationError("Password must be longer than 8 characters.")


class RequiredIf(Required):
    # a validator which makes a field required if
    # another field is set and has a truthy value

    def __init__(self, other_field_name, *args, **kwargs):
        self.other_field_name = other_field_name
        super(RequiredIf, self).__init__(*args, **kwargs)

    def __call__(self, form, field):
        other_field = form._fields.get(self.other_field_name)
        if other_field is None:
            raise Exception('no field named "%s" in form' % self.other_field_name)
        if other_field.data != "" and other_field is not None:
            super(RequiredIf, self).__call__(form, field)


class EditProfileForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    email = StringField("Email", validators=[Email()])
    firstname = StringField("First Name")
    lastname = StringField("Last Name")
    # password = PasswordField("Password", validators=[Length(min=8, max=64)])
    # password2 = PasswordField(
    #     "Repeat Password", validators=[RequiredIf("password"), EqualTo("password")]
    # )
    submit = SubmitField("Submit")

    def __init__(self, original_username, email, *args, **kwargs):
        super(EditProfileForm, self).__init__(*args, **kwargs)
        self.original_username = original_username
        self.original_email = email

    def validate_username(self, username):
        if username.data != self.original_username:
            user = User.query.filter_by(username=self.username.data).first()
            if user is not None:
                raise ValidationError("Username already taken.\nPlease use a different one.")

    def validate_email(self, email):
        if email.data != self.original_email:
            user = User.query.filter_by(email=self.email.data).first()
            if user is not None:
                raise ValidationError("Email already registered.\nPlease use a different one.")
