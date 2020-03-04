from flask import Flask, flash, request, render_template, session, make_response, redirect

app = Flask(__name__)
app.config["SECRET_KEY"] = "donttellanyone"

@app.route('/')
def show_home_page():
    return render_template('home.html')

@app.route('/login-form')
def show_login_form():
    return render_template('login-form.html')

@app.route('/login')
def verify_secret_code():
    SECRET = 'chickenz_are_gr8'
    entered_code = request.args['secret_code']
    if (entered_code == SECRET):
        session['entered-pin'] = True
        return redirect('/secret-invite')
    else:
        flash("The secret code you entered was not correct. Try again.")
        return redirect('/login-form')

@app.route('/secret-invite')
def show_secret_invite():
    if session.get("entered-pin", False):
        return render_template('invite.html')
    else:
        return redirect('/login-form')
