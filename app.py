from flask import Flask, render_template, redirect, send_file
from flask_pymongo import PyMongo
import requests
import scrape_eater
#import pandas as pd

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/eater_app"
mongo = PyMongo(app)

@app.route("/news")
def index_scrape():
    eater_content = mongo.db.eater_content.find_one()
    return render_template("index.html", eater=eater_content)

@app.route("/scrape")
def scrape():
    eater_content = mongo.db.eater_content
    eater_info = scrape_eater.scrape()
    eater_content.update({}, eater_info, upsert=True)
    return redirect("/", code=302)

@app.route("/")
def index():
    print("in index route")
    return send_file("static/index.html")  

@app.route("/resources/top_50.json")  
def top_50_json():
    print("in json resources route")
    return send_file("resources/top_50.json")

@app.route("/resources/top_50.csv")  
def top_50_csv():
    print("in csv resources route")
    return send_file("resources/top_50.csv")

@app.route("/resources/top_10.csv")  
def top_10_csv():
    print("in csv resources route")
    return send_file("resources/top_10.csv")    

#@app.route("/plot")
#def plot():
    #bike_data = pd.read_csv("resources/all_data_2020.csv", encoding="utf-8")
    #find ride occurances of stations - Pandas HW getting occurances by type 
    #pandas method to json

    #print(bike_data)
    # return final_data
#plot()    


if __name__ == "__main__":
    app.run(debug=True)