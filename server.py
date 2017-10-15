from flask import Flask, jsonify
import json
import pyrebase

#config for pyrebase (python wrapper for firebase)
config = {
    "apiKey": "AIzaSyD2UPwPcvgPKZ56qXOSAxnmSlUZSPMMsmc",
    "authDomain": "cookbook-94ca3.firebaseapp.com",
    "databaseURL": "https://cookbook-94ca3.firebaseio.com",
    "storageBucket": "cookbook-94ca3.appspot.com"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

print("configured")

#create flask app
app = Flask(__name__)

@app.route("/")
def hello():
    return "Starting up the cookbook"

@app.route("/removeUser/id=<id>", methods=['PUSH'])
def removeUser(id):
    db.child("Users").child(id).remove()
    return "success"

@app.route("/getUserRecipies/userId=<userId>", methods=['GET'])
def getUserRecipies(userId):
    myDict = {}
    user_recipes = db.child("Users").child(userId).get()
    for r in user_recipes.each():
        dic = r.val();
        name = r.key();
        myDict[name] = dic
    return json.dumps(myDict)

@app.route("/removeRecipe/recipeId=<recipeId>&userId=<userId>", methods=['PUSH'])
def removeRecipe(recipeId,userId):
    db.child("Users").child(userId).child(recipeId).remove()
    return "success"

@app.route("/getRecipe/recipeId=<recipeId>", methods=['GET'])
def getRecipe(recipeId):
    myDict = {}
    rec = db.child("recipes").get()
    for r in rec.each():
        dic = r.val()
        name = r.key()
        myDict[name] = dic
    return json.dumps(myDict)

if __name__=='__main__':
    app.run(debug=True)