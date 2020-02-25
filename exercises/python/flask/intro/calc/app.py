from flask import Flask, request
from operations import add, sub, mult, div
app = Flask(__name__)

@app.route('/add')
def addition():
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = add(a, b)
    return str(result)

@app.route('/sub')
def subtraction():
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = sub(a, b)
    return str(result)

@app.route('/mult')
def multiplication():
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = mult(a, b)
    return str(result)

@app.route('/div')
def division():
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = div(a, b)
    return str(result)

math_ops = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div,
}

@app.route('/math/<op>')
def do_math(op):
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = math_ops[op](a, b)
    return str(result)