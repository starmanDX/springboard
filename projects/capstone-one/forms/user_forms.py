from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, PasswordField
from wtforms.validators import InputRequired, Length, Regexp, EqualTo


class UserAddForm(FlaskForm):
    """Form for adding a user."""

    username = StringField('Username', validators=[
        InputRequired(), Regexp('^\w+$', message="Username must contain only letters, numbers, or underscore."), Length(min=3, max=64, message="Username must be between 3 and 64 characters long.")])
    password = PasswordField('Password', validators=[
        InputRequired(), Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})', message="Password must be between 8 and 64 characters long and contain at least one uppercase letter, lowercase letter, number and special character [!@#$%^&*].")])
    confirm = PasswordField('Confirm Password', validators=[
        InputRequired(), EqualTo('password', message="Passwords must match.")])
    location = SelectField('Location', default=('US', 'United States'), choices=[
        ('US', 'United States'), ('US-AL', 'Alabama'), ('US-AK', 'Alaska'),
        ('US-AZ', 'Arizona'), ('US-AR', 'Arkansas'), ('US-CA', 'California'),
        ('US-CO', 'Colorado'), ('US-CT', 'Connecticut'), ('US-DE', 'Delaware'),
        ('US-DC', 'District of Columbia'), ('US-FL', 'Florida'),
        ('US-GA', 'Georgia'), ('US-HI', 'Hawaii'), ('US-ID', 'Idaho'),
        ('US-IL', 'Illinois'), ('US-IN', 'Indiana'), ('US-IA', 'Iowa'),
        ('US-KS', 'Kansas'), ('US-KY', 'Kentucky'), ('US-LA', 'Louisiana'),
        ('US-ME', 'Maine'), ('US-MD', 'Maryland'), ('US-MA', 'Massachusetts'),
        ('US-MI', 'Michigan'), ('US-MN', 'Minnesota'), ('US-MS', 'Mississippi'),
        ('US-MO', 'Missouri'), ('US-MT', 'Montana'), ('US-NE', 'Nebraska'),
        ('US-NV', 'Nevada'), ('US-NH', 'New Hampshire'), ('US-NJ', 'New Jersey'),
        ('US-NM', 'New Mexico'), ('US-NY', 'New York'), ('US-NC', 'North Carolina'),
        ('US-ND', 'North Dakota'), ('US-OH', 'Ohio'), ('US-OK', 'Oklahoma'),
        ('US-OR', 'Oregon'), ('US-PA', 'Pennsylvania'), ('US-RI', 'Rhode Island'),
        ('US-SC', 'South Carolina'), ('US-SD', 'South Dakota'),
        ('US-TN', 'Tennessee'), ('US-TX', 'Texas'), ('US-UT', 'Utah'),
        ('US-VT', 'Vermont'), ('US-VA', 'Virginia'), ('US-WA', 'Washington'),
        ('US-WV', 'West Virginia'), ('US-WI', 'Wisconsin'), ('US-WY', 'Wyoming'), ])


class UserDeleteForm(FlaskForm):
    """Form for deleting a user."""

    password = PasswordField('Password', validators=[InputRequired()])
    confirm = PasswordField('Confirm Password', validators=[
        InputRequired(), EqualTo('password', message="Passwords must match.")])


class UserLocationForm(FlaskForm):
    """Form for changing a user's location."""

    location = SelectField('Location', choices=[
        ('US', 'United States'), ('US-AL', 'Alabama'), ('US-AK', 'Alaska'),
        ('US-AZ', 'Arizona'), ('US-AR', 'Arkansas'), ('US-CA', 'California'),
        ('US-CO', 'Colorado'), ('US-CT', 'Connecticut'), ('US-DE', 'Delaware'),
        ('US-DC', 'District of Columbia'), ('US-FL', 'Florida'),
        ('US-GA', 'Georgia'), ('US-HI', 'Hawaii'), ('US-ID', 'Idaho'),
        ('US-IL', 'Illinois'), ('US-IN', 'Indiana'), ('US-IA', 'Iowa'),
        ('US-KS', 'Kansas'), ('US-KY', 'Kentucky'), ('US-LA', 'Louisiana'),
        ('US-ME', 'Maine'), ('US-MD', 'Maryland'), ('US-MA', 'Massachusetts'),
        ('US-MI', 'Michigan'), ('US-MN', 'Minnesota'), ('US-MS', 'Mississippi'),
        ('US-MO', 'Missouri'), ('US-MT', 'Montana'), ('US-NE', 'Nebraska'),
        ('US-NV', 'Nevada'), ('US-NH', 'New Hampshire'), ('US-NJ', 'New Jersey'),
        ('US-NM', 'New Mexico'), ('US-NY', 'New York'), ('US-NC', 'North Carolina'),
        ('US-ND', 'North Dakota'), ('US-OH', 'Ohio'), ('US-OK', 'Oklahoma'),
        ('US-OR', 'Oregon'), ('US-PA', 'Pennsylvania'), ('US-RI', 'Rhode Island'),
        ('US-SC', 'South Carolina'), ('US-SD', 'South Dakota'),
        ('US-TN', 'Tennessee'), ('US-TX', 'Texas'), ('US-UT', 'Utah'),
        ('US-VT', 'Vermont'), ('US-VA', 'Virginia'), ('US-WA', 'Washington'),
        ('US-WV', 'West Virginia'), ('US-WI', 'Wisconsin'), ('US-WY', 'Wyoming')])


class UserLoginForm(FlaskForm):
    """Form for logging a user in."""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
