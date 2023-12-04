from flask import Flask, render_template, request
import storage.functions as fun
import json

app = Flask(__name__)

# @app.route("/completed-tasks", methods=["GET"])
# def getAll():
#    return fun.getAllComplete()

# @app.route("/incomplete-tasks", methods=["GET"])
# def getAll():
#    return fun.getAllIncomplete()

@app.route("/edit/<date>", methods=["POST"])
def edit(date):
    data = request.get_json()
    text = data.get('text', '')
    return fun.editTask(date, text)

@app.route("/complete/<date>")
def complete(date):
   return fun.completeTask(date)

@app.route("/delete/<date>")
def delete(date):
   return fun.deleteTask(date)

@app.route("/create", methods=["POST"])
def create():
    data = request.get_json()
    text = data.get('text', '')
    date = data.get('date', '')
    return fun.addTask(date, text)

@app.route("/clear")
def clearAll():
   return fun.clearAll()

@app.route("/")
def home():
    return render_template("index.html", incomplete=fun.getAllIncomplete().items(), complete=fun.getAllComplete().items())


app.run(debug=True)

