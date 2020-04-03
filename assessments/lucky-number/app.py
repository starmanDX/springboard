from flask import Flask, request, jsonify, render_template
from models import db, connect_db, User
import re, random, requests

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lucky_number'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret_number'

connect_db(app)


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")


# @app.route('/api/users')
# def list_users():
#     """ List all users in the database"""

#     users = [user.serialize() for user in User.query.all()]
#     return jsonify(users=users)


# @app.route('/api/users/<int:id>')
# def show_user(id):
#     """ List a single user"""

#     user = User.query.get_or_404(id)
#     return jsonify(user=user.serialize())

@app.route('/api/get-lucky-num', methods=['POST'])
def create_user():
    """Create a new user and add to database"""
    
    errors = {}
    if not request.json['name']:
        errors['name'] = ['This field is required.']
    if not request.json['email']:
        errors['email'] = ['This field is required.']
    elif not re.fullmatch(r'[^@]+@[^@]+\.[^@]+', request.json['email']):
        errors['email'] = ['Invalid email format.']
    if not request.json['year']:
        errors['year'] = ['This field is required.']
    try:
        request.json['year'] = int(request.json['year'])
        if request.json['year'] not in range(1900, 2020):
            errors['year'] = ['Year must be between 1900 and 2020.']
    except:
        errors['year'] = ['Year must be an integer.']
    if not request.json['color']:
        errors['color'] = ['This field is required.']
    elif request.json['color'].lower() not in ['red', 'green', 'orange', 'blue']:
        errors['color'] = ['Invalid value. Must be one of the following: red, green, orange, blue.']

    response_errors = jsonify(errors=errors)

    if response_errors.json['errors']:
        return (response_errors, 201)
    
    else:
        
        new_user = User(name=request.json['name'], email=request.json['email'],
                        birth_year=request.json['year'], color=request.json['color'], lucky_num=random.randrange(1,101,1))
        db.session.add(new_user)
        db.session.commit()

        api_year_response = requests.get(f'http://numbersapi.com/{new_user.birth_year}/year?json').json()['text']
        api_num_response = requests.get(f'http://numbersapi.com/{new_user.lucky_num}?json').json()['text']
        user_response_json = jsonify(num={'num': f'{new_user.lucky_num}', 'fact': f'{api_num_response}'},
                                     year={'year': f'{new_user.birth_year}', 'fact': f'{api_year_response}'})

        
        return (user_response_json, 201)
