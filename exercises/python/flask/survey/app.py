from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, surveys, satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "starmanDX"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    return render_template('home.html', surveys=surveys)

@app.route('/begin', methods=["POST"])
def begin_survey():
    session['responses'] = []
    return redirect('/questions/0')

@app.route('/questions/<question>')
def show_question(question):
    responses = session.get('responses')
    if (responses is None):
        return redirect('/')
    if (len(responses) == len(surveys['satisfaction'].questions)):
        return redirect('/finish')
    if (len(responses) != int(question)):
        flash('Invalid question id. Redirecting.', 'error')
        return redirect(f"/questions/{len(responses)}")
    return render_template('question.html', question_num=int(question) + 1, surveys=surveys)


@app.route('/answer', methods=["POST"])
def add_answer():
    answer = request.form['choice']
    responses = session['responses']
    responses.append(answer)
    session['responses'] = responses

    if (len(responses) == len(surveys['satisfaction'].questions)):
        return redirect('/finish')
    return redirect(f'/questions/{len(session["responses"])}')

@app.route('/finish')
def show_finish():
    return render_template('finish.html')
