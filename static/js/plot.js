//resources\top_50.json
d3.json("/resources/top_50.json").then(function(stations) {

//   // Print the tvData
  console.log(stations);

//   // Cast the hours value to a number for each piece of tvData
//   stations.forEach(function(data) {
//     data.Ride_count = +data.Ride_count;
//   });

//   var barSpacing = 10; // desired space between each bar
//   var scaleY = 10; // 10x scale on rect height

// // //   // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (chartWidth - (barSpacing * (stations.length - 1))) / stations.length;

// //   // @TODO
// //   // Create code to build the bar chart using the tvData.
//   chartGroup.selectAll(".bar")
//     .data(stations)
//     .enter()
//     .append("rect")
//     .classed("bar", true)
//     .attr("width", d => barWidth)
//     .attr("height", d => d.Ride_count * scaleY)
//     .attr("x", (d, i) => i * (barWidth + barSpacing))
//     .attr("y", d => chartHeight - d.Ride_count * scaleY);
// }).catch(function(error) {
//   console.log(error);
});  