from flask import Flask, request, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = "starmanDX"


@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/story')
def show_story():
    place = request.args["place"]
    noun = request.args["noun"]
    verb = request.args["verb"]
    adjective = request.args["adjective"]
    plural_noun = request.args["plural_noun"]
    story = request.args["story"]
    return render_template('story.html', place=place, noun=noun, verb=verb, adjective=adjective, plural_noun=plural_noun, story=story)