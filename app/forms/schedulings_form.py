from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired

class SchedulingForm(FlaskForm):
    date = DateField("Date", validators=[DataRequired()], format='%Y-%m-%d')
    time_start = TimeField('Start Time', validators=[DataRequired()])
    time_end = TimeField('End Time', validators=[DataRequired()])
