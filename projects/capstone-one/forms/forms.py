from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, Regexp, EqualTo

class UserAddForm(FlaskForm):
    """Form for adding a user."""

    username = StringField('Username', validators=[InputRequired(), Regexp('^\w+$', message="Username must contain only letters, numbers, or underscore."), Length(min=3, max=64, message="Username must be between 3 and 64 characters long.")])
    password = PasswordField('Password', validators=[InputRequired(), Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})', message="Password must be between 8 and 64 characters long and contain at least one uppercase letter, lowercase letter, number and special character [!@#$%^&*].")])
    confirm = PasswordField('Confirm Password', validators=[InputRequired(), EqualTo('password', message="Passwords must match.")])

class LoginForm(FlaskForm):
    """Form for logging a user in."""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
