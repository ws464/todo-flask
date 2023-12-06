from flask import Flask, render_template, request
import storage.functions as fun
import json

app = Flask(__name__)

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

@app.route("/completed-tasks", methods=["GET"])
def getAllCompleted():
   return fun.getAllComplete()

@app.route("/incomplete-tasks", methods=["GET"])
def getAllIncomplete():
   return fun.getAllIncomplete()

@app.route("/")
def home():
    incomplete = fun.getAllIncomplete()
    complete=fun.getAllComplete()
    # print(type(incomplete))
    # print(type(complete))
    # print(incomplete)
    # print(complete)
    #Can't return json.... will have to reformat this at some point.....
    return render_template("index.html", incomplete=incomplete['data'], complete=complete['data'])
    #return "hello world!"


app.run(debug=True)

