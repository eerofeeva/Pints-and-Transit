from flask import Flask, render_template, redirect, send_file
from flask_pymongo import PyMongo
import json
import requests
import scrape_eater
import psycopg2
from data_loading.config import config

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

@app.route("/resources/heatmap")   
def heatmap():
    params = config('data_loading/database.ini', 'postgresql')
    con = psycopg2.connect(**params)
    cur = con.cursor()
    get_heatmap = config(config_db = 'data_loading/database.ini', section_to_parse = 'get_heatmap')
    cur.execute(get_heatmap["get_heatmap"])
    h_table = cur.fetchall()
    #print(h_table)
    #return json.dumps(h_table, cls=DecEncoder)
    return json.dumps([
        {
            'id': int(h[0]),
            'name': str(h[1]),
            'lat': float(h[2]),
            'lng': float(h[3]),
            'nearby': int(h[4]),
            'total_rides': int(h[5])
        } for h in h_table
    ])

if __name__ == "__main__":
    app.run(debug=True)