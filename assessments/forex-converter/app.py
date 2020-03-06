from flask import Flask, request, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from currency import calc_conversion, check_valid_code

app = Flask(__name__)
app.config['SECRET_KEY'] = "starmanDX"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_form():
    return render_template('form.html')


@app.route('/results', methods=["POST"])
def show_results():
    convert_from = request.form['convert_from'].upper()
    convert_to = request.form['convert_to'].upper()
    amount = request.form['amount']

    if (check_valid_code(convert_from, convert_to) == False):
        return redirect('/')
    else:
        conversion = calc_conversion(convert_from, convert_to, amount)
        return render_template('results.html', conversion=conversion)
