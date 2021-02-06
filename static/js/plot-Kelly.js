// Fetch the JSON data and console log it
const csv = "../../resources/top_10.csv";

d3.csv(csv).then(function(data) {
    console.log(data);
  });

// d3.json("/plot").then
  // create plot

//   // Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// // // // Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// // // Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // // // Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// // // // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // // // to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv("../../resources/top_10.csv").then(function(stations) {


  console.log(stations);


  stations.forEach(function(data) {
    // data.Ride_count =+ data.Ride_count;
    console.log(data.Ride_count)
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

// Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (stations.length - 1))) / stations.length;

// @TODO
 // Create code to build the bar chart 
  chartGroup.selectAll(".bar")
    .data(stations)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", data => barWidth)
    .attr("height", data => data.Ride_count * scaleY)
    .attr("x", (data, i) => i * (barWidth + barSpacing))
    .attr("y", data => chartHeight - data.Ride_count * scaleY);
}).catch(function(error) {
  console.log(error);
});  