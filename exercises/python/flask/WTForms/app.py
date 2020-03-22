from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.utils import secure_filename
from models import db, connect_db, Pet
from forms import AddPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'abc123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def show_home():
    pets = Pet.query.all()

    return render_template('home.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def show_add_pet_form():
    new_pet_form = AddPetForm()
    if new_pet_form.validate_on_submit():
        filename = secure_filename(new_pet_form.photo_upload.data.filename)
        new_pet_form.photo_upload.data.save('static/images/' + filename)
        return redirect('/')
    else: 
        return render_template('add_pet_form.html')