from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.utils import secure_filename
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

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
    form = AddPetForm()
    if form.validate_on_submit():
        data = {k:v for k, v in form.data.items() if k != "csrf_token"}
        
        new_pet = Pet(**data)
        db.session.add(new_pet)
        db.session.commit()

        flash(f"{new_pet.name} has been added to our database!")
        
        return redirect('/')
    else: 
        return render_template('add_pet_form.html', form = form)
    
@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_add_pet_form(pet_id):
    form = EditPetForm()
    pet = Pet.query.get_or_404(pet_id)

    if form.validate_on_submit():
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.photo_url = form.photo_url.data
        db.session.commit()

        flash(f"{pet.name} has been updated!")

        return redirect('/')
    else:
        return render_template('edit_pet_form.html', form=form, pet=pet)
