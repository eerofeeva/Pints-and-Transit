from flask import Flask, render_template, redirect, send_file
from flask_pymongo import PyMongo
import requests
import scrape_eater

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/eater_app"
mongo = PyMongo(app)

@app.route("/news")
def index_scrape():
    eater_content = mongo.db.eater_content.find_one()
    return render_template("index.html", mars=eater_content)
    #return render_template("index.html", eater=eater_content)

@app.route("/scrape")
def scrape():
    eater_content = mongo.db.eater_content
    eater_info = scrape_eater.scrape()
    eater_content.update({}, eater_info, upsert=True)
    return redirect("/", code=302)

@app.route("/")
def index():
    return send_file("static\index.html")   

if __name__ == "__main__":
    app.run(debug=True)