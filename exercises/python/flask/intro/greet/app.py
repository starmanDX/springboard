from flask import Flask
app = Flask(__name__)

@app.routes('/welcome')
def welcome_page():
    return "Welcome"

@app.routes('/welcome/home')
def welcome_home():
    return "Welcome Home"

@app.routes('/welcome/back')
def welcome_back():
    return "Welcome Back"