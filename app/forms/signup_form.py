from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp
from flask_wtf.file import FileField, FileRequired, FileAllowed
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    profile_picture = StringField("Profile Picture", validators=[DataRequired(), Regexp(r"^https?:\/\/.+")])
    date_of_birth = StringField("Date Of Birth", validators=[DataRequired()])
    gender = StringField("Gender", validators=[DataRequired()])
    about_me = TextAreaField("About Me", validators=[DataRequired()])
    location_id = StringField("Location ID", validators=[DataRequired()])
