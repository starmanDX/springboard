from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, FileField, SelectField, FloatField, IntegerField, BooleanField
from wtforms.validators import ValidationError, InputRequired, Optional, URL


class AddPetForm(FlaskForm):
    """Form for adding pets."""

    pet_name = StringField("Pet Name", validators=[
                       InputRequired(message="Pet name can't be blank.")])
    species = StringField("Species", validators=[
        InputRequired(message="Species can't be blank.")])
    age = IntegerField("Age", validators=[
        InputRequired(message="Age can't be blank.")])
    photo_url = StringField("Photo URL", validators=[Optional(), URL(), url_or_upload])
    photo_upload = FileField("Upload a Photo", validators=[Optional(), url_or_upload])
    notes = StringField("This is a healthy snack.")

def url_or_upload(form, field):
        if form.photo_url & form.photo_upload:
            raise ValidationError("Please choose either a photo URL or upload.")