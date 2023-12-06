import pickle
from flask import jsonify

INCOMPLETE_PATH = "incomplete_tasks.pickle"
COMPLETE_PATH = "complete_tasks.pickle"

def getAllIncomplete():
    tasks={}
    try:
        tasks = pickle.load(open(INCOMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        tasks={}
        pickle.dump(tasks, open(INCOMPLETE_PATH, "wb"))
        print(list(tasks.items()))
    return {'data': [(k,v) for k,v in tasks.items()]}

def getAllComplete():
    tasks={}
    try:
        tasks = pickle.load(open(COMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        tasks={}
        pickle.dump(tasks, open(COMPLETE_PATH, "wb"))
        print(list(tasks.items()))
    return {'data': [(k,v) for k,v in tasks.items()]}

def addTask(date, text):
    tasks={}
    try:
        tasks = pickle.load(open(INCOMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        tasks={}
        pickle.dump(tasks, open(INCOMPLETE_PATH, "wb"))
    tasks[date]=text
    with open(INCOMPLETE_PATH, 'wb') as file: 
        pickle.dump(tasks, file) 
    return {date: date, text: text}

def deleteTask(date):
    incomplete_tasks={}
    complete_tasks={}
    try:
        complete_tasks = pickle.load(open(COMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        complete_tasks={}
        pickle.dump(complete_tasks, open(COMPLETE_PATH, "wb"))
    try:
        incomplete_tasks = pickle.load(open(INCOMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        incomplete_tasks={}
        pickle.dump(incomplete_tasks, open(INCOMPLETE_PATH, "wb"))
    incomplete_tasks.pop(date, None)
    complete_tasks.pop(date, None)
    with open(INCOMPLETE_PATH, 'wb') as file: 
        pickle.dump(incomplete_tasks, file)
    with open(COMPLETE_PATH, 'wb') as file: 
        pickle.dump(complete_tasks, file)
    return {"success": True}

def completeTask(date):
    incomplete_tasks={}
    complete_tasks={}
    try:
        complete_tasks = pickle.load(open(COMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        complete_tasks={}
        pickle.dump(complete_tasks, open(COMPLETE_PATH, "wb"))
    try:
        incomplete_tasks = pickle.load(open(INCOMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        incomplete_tasks={}
        pickle.dump(incomplete_tasks, open(INCOMPLETE_PATH, "wb"))
    text = incomplete_tasks[date]
    incomplete_tasks.pop(date, None)
    complete_tasks[date] = text
    with open(INCOMPLETE_PATH, 'wb') as file: 
        pickle.dump(incomplete_tasks, file)
    with open(COMPLETE_PATH, 'wb') as file: 
        pickle.dump(complete_tasks, file)
    return {"success": True}

def editTask(date, text):
    incomplete_tasks={}
    complete_tasks={}
    try:
        complete_tasks = pickle.load(open(COMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        complete_tasks={}
        pickle.dump(complete_tasks, open(COMPLETE_PATH, "wb"))
    try:
        incomplete_tasks = pickle.load(open(INCOMPLETE_PATH, "rb"))
    except (OSError, IOError) as e:
        incomplete_tasks={}
        pickle.dump(incomplete_tasks, open(INCOMPLETE_PATH, "wb"))
    if(incomplete_tasks.keys().__contains__(date)):
        incomplete_tasks[date] = text
        with open(INCOMPLETE_PATH, 'wb') as file: 
            pickle.dump(incomplete_tasks, file)
    elif(complete_tasks.keys().__contains__(date)):
        complete_tasks[date] = text
        with open(COMPLETE_PATH, 'wb') as file: 
            pickle.dump(complete_tasks, file)
    return {"success": True}

def clearAll():
    incomplete_tasks={}
    complete_tasks={}
    with open(INCOMPLETE_PATH, 'wb') as file: 
            pickle.dump(incomplete_tasks, file)
    with open(COMPLETE_PATH, 'wb') as file: 
            pickle.dump(complete_tasks, file)
    return {"success": True}
    