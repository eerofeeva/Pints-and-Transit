#Pints and Transit

For Project 3 our group has chosen to explore the niceride bike system and locations of breweries around the Twin Cities, as well as interesting articles 
pertaining to the bar and restaurant scene from Eater, with an aim of gathering the information 
of where could one open the next microbrewery or gastropub to quench the post-covid thirst of
the growing Twin Cities biking community.

DATA: 
We found data in the form of multiple CSV files about niceride bike usage from the following 
source: https://s3.amazonaws.com/niceride-data/index.html. We also used data from the following APIs for liquor liscense information: 
  1.Off sale liquor license: https://opendata.minneapolismn.gov/datasets/off-sale-liquor 
  2.On sale Liquor license: https://opendata.minneapolismn.gov/datasets/on-sale-liquor 

A website with 3 pages was designed and implemented to include:
  1. About  
  2. Graph 
  3. Map 
  4. News 

A web scrape program was written to scrape the top current articles from Eater and display on our web page, using a Flask server and MongoDB. We also used izimodal to create a pop-up window which plays a video.

The niceride csv data was cleaned and organized, and eventually loaded into Postgres for further analysis on station location. Psycop2 was used to integrate the data 
to the map. The resulting data for 2020 was used to generate a bar graph depicting the busiest 50 bike stations.

The API data from liquor licenses and bike stations were combined on the heatmap page via the following process:
1. data is loaded into PostGres server via psycopg2 package and code in data_loading directory (same loading process as we used in Project 2) - to cut down on time it takes to do data cleaning for the heatmap
2. Data is cleaned via several queries in data_loading, with over 130,000 rows of initial data between 3 different sets one Bikes.EndStations and OnSale licenses, it proven impossible to complete calculations in the front-end (browser) in under 2-3 minutes, so that is why we went with the postgres for this project 
3. The heatmap is served to front-end via an API route in app.py (Flask), in app.js the heatmap is calculated as an inverse relationship between number of Bikes End Stations and OnSale Licenses within half-mile of the each bike station. To dampen the effect of a high number of rides (in tens of thousands) we multiplied the NumberOfBikes by intensity of 0.01. Result is the following formula:
                       Intensity*NumberOfBikes/NumberOfLicensesWithinHalfMile
                       


