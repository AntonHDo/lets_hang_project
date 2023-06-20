from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS


class ImageForm(FlaskForm):
    profile_picture = FileField("Image File", validators=[FileRequired(message='Image is required'), FileAllowed(list(ALLOWED_EXTENSIONS))])