from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import requests
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route("/")
def index():
    mars_content = mongo.db.mars_content.find_one()
    return render_template("index.html", mars=mars_content)

@app.route("/scrape")
def scrape():
    mars_content = mongo.db.mars_content
    mars_info = scrape_mars.scrape()
    mars_content.update({}, mars_info, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)