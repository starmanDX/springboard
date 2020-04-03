from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import NumberRange, InputRequired, Email


class AddUserForm(FlaskForm):
    """Form for adding users."""

    name = StringField("User Name", validators=[InputRequired(message="User name can't be blank.")])
    email = StringField("Email", validators=[InputRequired(message="Email can't be blank."), Email()])
    birth_year = IntegerField("Birth Year", validators=[InputRequired(message="Birth year can't be blank."), NumberRange(min=1900, max=2020, message="Birth year must be between %(min)s and %(max)s.")])
    color = StringField("Favorite Color", validators=[InputRequired(message="Favorite color can't be blank.")])