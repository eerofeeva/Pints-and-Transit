#Pints and Transit

For Project 2 our group has chosen to explore the niceride bike system and locations of breweries around the Twin Cities, as well as interesting articles 
pertaining to the bar and restaurant scene from Eater. We found data in the form of multiple CSV files about niceride bike usage from the following 
source: https://s3.amazonaws.com/niceride-data/index.html. We also used data from the following APIs for liquor liscense information: 
  1.Off sale liquor license: https://opendata.minneapolismn.gov/datasets/off-sale-liquor 
  2.On sale Liquor license: https://opendata.minneapolismn.gov/datasets/on-sale-liquor 

A website with 3 pages was designed and implemented to include:
  1. About page 
  2. Map page
  3. Graph page

A web scrape program was written to scrape the top current articles from Eater and display on our web page, using a Flask server and MongoDB. We also used izimodal to create a pop-up window which plays a video.

The niceride csv data was cleaned and organized, and eventually loaded into Postgres for further analysis on station location. Psycop2 was used to integrate the data 
to the map. The resulting data for 2020 was used to generate a bar graph depicting the busiest 50 bike stations.

The API data from liquor sales, Minneapolis neighborhoods, and bike stations were combined on the map page.

