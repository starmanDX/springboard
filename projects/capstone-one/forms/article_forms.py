from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired


class ArticleAddForm(FlaskForm):
    """Form for adding a saved article.
    
    This is a hidden form, sent via jquery when user
    saves an article.
    """

    path = StringField('Path', validators=[InputRequired()])
    url = StringField('URL', validators=[InputRequired()])
    location = StringField('Location', validators=[InputRequired()])
    title = StringField('Title', validators=[InputRequired()])
    excerpt = StringField('Excerpt', validators=[InputRequired()])
    image = StringField('Image')
    source = StringField('Source', validators=[InputRequired()])
    published_date = StringField(
        'Published Date', validators=[InputRequired()])
    saved_by = StringField('Published Date', validators=[InputRequired()])
