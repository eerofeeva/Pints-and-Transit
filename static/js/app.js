//globals
var onSaleData;
var offSaleData;

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: MINNEAPOLIS_CENTER_COORDS,
    zoom: STARTING_ZOOM
  });

 //create layers
 var ofSaleLayer = L.layerGroup();
 var onSaleLayer = L.layerGroup();
 var heatmapLayer = L.layerGroup(); 

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
    L.heatLayer(json2heat(d,.01)).addTo(heatmapLayer);
  });
  
  //adding on sale markers
  var onSaleMarkers = d3.json(BREWERY_ONSALE_QUERY_URL).then(function(response){
    for (var i = 0; i < response.features.length; i++) {
      L.circle([response.features[i].attributes.lat, response.features[i].attributes.long],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        radius: 50
      }
      ).bindPopup("<p>" + response.features[i].attributes.licenseName + "</p>")
      .addTo(onSaleLayer);
    }
  }); 
 
  //adding off sale markers
  var ofSaleMarkers= d3.json(BREWERY_OFSALE_QUERY_URL).then(function(response){
    for (var i = 0; i < response.features.length; i++) {
      L.circle([response.features[i].attributes.lat, response.features[i].attributes.long],{
        fillOpacity: 0.75,
        color: "white",
        fillColor: "green",
        radius: 50
      }
      ).bindPopup("<p>" + response.features[i].attributes.licenseName + "</p>")
      .addTo(ofSaleLayer);
    }
  }); 
 
  var overlayMaps = {
      "bars, restaurants, brewpubs": onSaleLayer,
      "liquor stores and off-sale": ofSaleLayer,
      "where are the thirsty bikers?":heatmapLayer
    };
  L.control.layers({},overlayMaps).addTo(myMap);