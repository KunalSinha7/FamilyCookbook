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
# db.child("users")
# db.child("recipes")
print("configured")
# auth = firebase.auth()
# user = auth.sign_in_with_email_and_password("kunalsinha98@gmail.com", "soccerRMA7!")

#create flask app
app = Flask(__name__)

@app.route("/")
def hello():
    return "Starting up the cookbook"

@app.route("/addUser/id=<id>&name=<name>",  methods=['POST'])
def addUser(id, name):
    data = {'id' : id, 'name' : name}
    # db.child("users").child(id)
    result =db.child("users").child(id).set(data)
    # print (result)
    return "success"

@app.route("/removeUser/id=<id>", methods=['PUSH'])
def removeUser(id):
    db.child("users").child(id).remove()
    return "success"

@app.route("/getUser/id=<id>", methods=['GET'])
def getUser(id):
    user = db.child("users").child(id).get()
    return user.val()

@app.route("/addRecipe/recipeId=<recipeId>&name=<name>&ownerId=<ownerId>&recipe=<recipe>&favs=<favs>",  methods=['POST'])
def addRecipe(recipeId, name, ownerId, recipe):
    data = {'recipeId' : recipeId, 'name' : name, 'ownerId' : ownerId, 'recipe' : recipe, 'favs' : favs}
    result = db.child("recipes").child(recipeId).set(data)
    user = db.child("users").child(ownerId).child("recipes").push({"recipeId" : recipeId})
    return "success"

@app.route("/removeRecipe/recipeId=<recipeId>", methods=['PUSH'])
def removeRecipe(recipeId):
    owner = db.child("recipes").child(recipeId).child("ownerId").val()
    db.child("recipes").child(recipeId).remove()
    user_recipes = db.child("users").child(owner).child("recipes").get()
    for rec in user_recipes.each():
        if(db.child("users").child(owner).child("recipes").val() == recipeId):
            db.child("users").child(owner).child("recipes").child(db.child("users").child(owner).child("recipes").key()).remove()
            break
    return "success"

@app.route("/getRecipe/recipeId=<recipeId>", methods=['PUSH'])
def getRecipe(recipeId):
    return db.child("recipes").child(recipeId).val()

@app.route("/getFavs/recipeId=<recipeId>", methods=['PUSH'])
def getFavs(recipeId):
    return db.child("recipe").child(recipeId).child("favs").val()
