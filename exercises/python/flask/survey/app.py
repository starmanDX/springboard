from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "starmanDX"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []


@app.route('/')
def home_page():
    return render_template('home.html', surveys=surveys)


@app.route('/questions/<question>')
def show_question(question):
    return render_template('question.html', question_num=int(question) + 1, surveys=surveys)


@app.route('/answer', methods=["POST"])
def add_answer():
    answer = request.form['choice']
    responses.append(answer)
    return redirect('/')
