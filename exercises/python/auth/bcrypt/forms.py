from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import Length, InputRequired, Email


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[Length(min=3), InputRequired()], render_kw={"placeholder": "User123"})
    password = PasswordField('Password', validators=[Length(min=8), InputRequired()], render_kw={"placeholder": "Enter a password (min 8 characters)"})
    email = StringField('Email', validators=[InputRequired(), Email()], render_kw={"placeholder": "User123@domain.com"})
    first_name = StringField('First Name', validators=[InputRequired()], render_kw={"placeholder": "John"})
    last_name = StringField('Last Name', validators=[InputRequired()], render_kw={"placeholder": "Doe"})

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    
class FeedbackForm(FlaskForm):
    title = StringField("Feedback Title", validators=[Length(min=1, max=100),InputRequired()], render_kw={"placeholder": "Enter a title"})
    content = StringField("Feedback Content", validators=[Length(min=1), InputRequired()], render_kw={"placeholder": "Enter feedback content"})
