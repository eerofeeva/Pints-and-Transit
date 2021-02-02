// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: MINNEAPOLIS_CENTER_COORDS,
    zoom: STARTING_ZOOM
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  //https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#8.07/44.788/-93.333
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: MAPBOX_API_KEY
  }).addTo(myMap);

  //get onsale data
  d3.json(BREWERY_ONSALE_QUERY_URL).then(function(data) {
   var onSaleData = data;
  });
  //get ofsale data
  d3.json(BREWERY_OFFSALE_QUERY_URL).then(function(data) {
    var offSaleData = data;
   });
  //get neighbourhood layer