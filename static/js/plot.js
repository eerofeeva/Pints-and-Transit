var svgWidth = 1440;
var svgHeight = 660;

var chartMargin = {
  top: 100,
  right: 10,
  bottom: 200,
  left: 40
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("/resources/top_50.csv").then(function(stations) {
// Print the stations data
  console.log(stations);

  stations.forEach(function(d) {
    d.Ride_count = +d.Ride_count;
  });

var xBandScale = d3.scaleBand()
.domain(stations.map(d => d.start_station_name))
.range([0, chartWidth])
.padding(0.1);

// Create a linear scale for the vertical axis.
var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(stations, d => d.Ride_count)])
.range([chartHeight, 0]);

var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale).ticks(5);

chartGroup.append("g")
.call(leftAxis);

chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis).selectAll("text")	
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", ".15em")
.attr("transform", function(d) {
    return "rotate(-90)" 
    });



chartGroup.selectAll(".bar")
    .data(stations)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.start_station_name))
    .attr("y", d => yLinearScale(d.Ride_count))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.Ride_count))
    .on("click", function(d, i) {
      alert(`Bike Station ${d.start_station_name}`);
    })

chartGroup.append("text")
.attr("x", (chartWidth / 2))             
.attr("y", 0 - (chartMargin.top / 2))
.attr("text-anchor", "middle")  
.style("font-size", "25px") 
.style("text-decoration", "underline")  
.text("50 Busiest Bike Stations: Click to See Station Name");


  }).catch(function(error) {
  console.log(error);
});  