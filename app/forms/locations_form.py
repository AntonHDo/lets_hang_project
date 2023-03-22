from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileRequired, FileAllowed


class LocationForm(FlaskForm):
    location_name = StringField("Name Of Location", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    country = StringField("Country", validators=[DataRequired()])
    preview_img = FileField("Image of location", validators=[FileRequired(), FileAllowed(['jpg', 'jpeg', 'png'], 'Images only!')])
