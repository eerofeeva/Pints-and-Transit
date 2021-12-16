#This is the original description of the project

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
2. Data is cleaned via several queries in data_loading, with over 130,000 rows of initial data between 3 different sets one Bikes.EndStations and OnSale licenses, it proven impossible to complete calculations in the front-end (browser) in under 2-3 minutes, so that is why we went with the postgres for this project. As part of the data cleaning we used two packages that come installed with postgres for calculating the distance between the BikeEndStations and OnSaleLiquorLicenses:     cube and  earthdistance; 
3. The heatmap is served to front-end via an API route in app.py (Flask), in app.js the heatmap is calculated as an inverse relationship between number of Bikes End Stations and OnSale Licenses within half-mile of the each bike station. To dampen the effect of a high number of rides (in tens of thousands) we multiplied the NumberOfBikes by intensity of 0.01. Result is the following formula:
                       Intensity * NumberOfBikes / NumberOfLicensesWithinHalfMile

LIMITATIONS WE ENCOUNTERED:
1. Data cleaning again took too long, as geo coordinates for bikes differed slightly for BikeEndStations (either stations being moved due to construction/seasonal change, or even bikes being parked at far ends of the stations). To this moment we are not sure if coordinates represent the exact coordinate of the station or the coordinates transmitted by Nice Ride Bike itself. 
2. Some Liquor Licenses appeared more than once with different coordinates, and others didn't have an identifiable name. The latter was more true of the OfSale Liquor Licenses, which is why they are excluded from the heatmap
3. We didn't include StartStations of Nice Ride Bikes into the calculation due to data volume.
4. We initially wanted to include Bus and Scooter data but could not easily uncover a dataset fitting our criteria.
5. Obviously our heatmap does not take in account the zoning and other city rules, but for a future gastropub or brewery owner, we can only advocate starting small, approachable and mobile,  - just as their future thirsty customers, - and perhaps launching a new food truck.  


