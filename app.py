from flask import Flask, render_template, redirect, send_file
import csv
import json

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection

@app.route("/")
def index():
    print("in index route")
    return send_file("static/index.html")  

@app.route("/resources/top_50.csv")  
def top_50_csv():
    print("in csv resources route")
    return send_file("resources/top_50.csv")

@app.route("/resources/heatmap")   
def heatmap():
    with open('resources/test_map.csv', newline='') as csvfile:
        h_table = csv.reader(csvfile) 
        json_map = json.dumps([
        {
            'id': int(float(h[0])),
            'name': str(h[1]),
            'lat': float(h[2]),
            'lng': float(h[3]),
            'nearby': int(h[4]),
            'total_rides': int(h[5])
        } for h in h_table
        ])
    return json_map

if __name__ == "__main__":
    app.run(debug=True)