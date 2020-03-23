from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField, SelectField, IntegerField, TextAreaField
from wtforms.validators import NumberRange, InputRequired, Optional, URL


class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name", validators=[
                       InputRequired(message="Pet name can't be blank.")])
    species = SelectField("Species", choices=[(None, ''), ('bird', 'Bird'), ('cat', 'Cat'), (
        'dog', 'Dog'), ('hamster', 'Hamster'), ('reptile', 'Reptile'), ('other', 'Other')], default=None)
    age = IntegerField("Age", validators=[
        InputRequired(message="Age can't be blank."), NumberRange(min=0, max=30, message="Age must be between %(min)s and %(max)s.")])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", render_kw={"placeholder" : "Enter any notes about the pet..."},validators=[Optional()])


class EditPetForm(FlaskForm):
    """Form for editing pets."""

    available = BooleanField("Available for adoption?")
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", render_kw={
                          "placeholder": "Enter any notes about the pet..."}, validators=[Optional()])
