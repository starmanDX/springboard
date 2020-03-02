from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

app = Flask(__name__)
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

MOVIES = {'Amadeus', 'Chicken Run', 'Dances With Wolves'}

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/old-home-page')
def redirect_to_home():
    """Redirects to new homepage"""
    flash('That page has moved. This is our new homepage.')
    return redirect('/')

@app.route('/movies')
def show_all_movies():
    """Show list of all movies in fake DB"""
    return render_template('movies.html', movies=MOVIES)

@app.route('/movies/json')
def get_movies_json():
    json_obj = jsonify(list(MOVIES))
    return json_obj

@app.route('/movies/new', methods=["POST"])
def add_movie():
    title = request.form['title']
    if title in MOVIES:
        flash("Movie already exists.", 'error')
    else:
        MOVIES.add(title)
        flash("Added Your Movie!", 'success')
    return redirect('/movies')

@app.route('/hello')
def say_hello():
    return render_template("hello.html")

@app.route('/search')
def search():
    term = request.args["term"]
    sort = request.args["sort"]
    return f"<h1>Search results for: {term}</h1> <p> Sorting by: {sort}</p>"

@app.route('/add-comment')
def add_comment_form():
    return"""
    <h1>Add Comment</h1>
    <form method="POST">
        <input type="text" placeholder="comment" name="comment" />
        <input type="text" placeholder="username" name="username" />
        <button>Submit</button>
    </form>
    """

@app.route('/add-comment', methods=["POST"])
def save_comment():
    comment = request.form["comment"]
    username = request.form["username"]
    return f"""
    <h1>SAVED YOUR COMMENT</h1>
    <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment}</li>
    </ul>
    """

@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"<h1>Browsing the {subreddit} Subreddit</h1>"

@app.route('/r/<subreddit>/comments/<int:post_id>')
def show_comments(subreddit, post_id):
    return f"<h1> Viewing comments for post with id: {post_id} from the {subreddit} Subreddit</h1>"

POSTS = {
    1: "post1",
    2: "post2",
    3: "post3",
    4: "post4"
}

@app.route('/posts/<int:id>')
def find_post(id):
    post = POSTS.get(id, "Post not found")
    return f"<p>{post}</p>"

@app.route('/lucky')
def lucky_num():
    num = randint(1,10)
    return render_template('lucky.html', lucky_num=num, msg="You are so lucky!")

@app.route('/spell/<word>')
def spell_word(word):
    caps_word = word.upper()
    return render_template('spell_word.html', word=caps_word)

COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "pythonic"]

@app.route('/form')
def show_form():
    return render_template('form.html')

@app.route('/form-2')
def show_form_2():
    return render_template('form_2.html')

@app.route('/greet')
def get_greeting():
    username = request.args["username"]
    nice_thing = choice(COMPLIMENTS)
    return render_template('greet.html', username=username, compliment=nice_thing)

@app.route('/greet-2')
def get_greeting_2():
    username = request.args["username"]
    wants = request.args.get("wants_compliments")
    nice_things = sample(COMPLIMENTS, 3)
    return render_template('greet_2.html', username=username, wants_compliments=wants, compliments=nice_things)