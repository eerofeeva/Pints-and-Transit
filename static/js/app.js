//globals
var onSaleData;
var offSaleData;
var neighbourhoods;

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: MINNEAPOLIS_CENTER_COORDS,
    zoom: STARTING_ZOOM
  });

  // Adding a tile layer (the background map image) to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: MAPBOX_API_KEY
  }).addTo(myMap);

  $.getJSON("/resources/heatmap").then(function(d){
    var jsonMarkerOptions = {
      radius: 3,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    var json2heat = function(data, intensity) {
          return data.map(function(feature) {
          return [parseFloat(feature.lat), 
                  parseFloat(feature.lng), intensity*feature.total_rides/feature.nearby];
              });
          };
    L.heatLayer(json2heat(d,.01)).addTo(myMap);
  });

  //adding on sale markers

  //adding off sale markers

  //bike station markers
// Loop through the top_50 array and create one marker for each station
// and then add it to the map using the addTo method
// var marker = L.marker([45.52, -122.67], {
//   draggable: true,
//   title: "My First Marker"
// }).addTo(myMap);