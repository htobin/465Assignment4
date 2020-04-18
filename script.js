
// Code used from https://www.d3-graph-gallery.com/graph/line_basic.html for the creation of the graph
// Adjustments:
//    Prevent graph from showing negative values
//    Clicking the button for the graph creates a new graph and removes the old one
clickToRefresh();

//This function refreshes the SVG each time the user enters new information and clicks the graph button
function clickToRefresh() {
  //remove SVG to create a blank/new sSVG
  d3.selectAll('svg').remove();
  
  // set the dimensions and margins of the graph: Modifications done by Dennis kim
  var margin = { top: 10, right: 30, bottom: 40, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  //data for the graph is created in the main function, when the calculate button is pressed
  var data = main();
  
  
// Add X axis --> it is a date format
  var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) {
        return d.date;
      }))
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  svg.append("text")      // text label for the x axis
      .attr("transform", "translate(" + (width / 2) + " ," + (height - 10 + margin.bottom) + ")")
      .style("text-anchor", "middle")
      .text("Timeline of payment");

// Add Y axis: Modified by Sophia Kim to produce better y labels
  var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) {
        return +d.value;
      })])
      .range([height, 0]);
  svg.append("g")
      .call(d3.axisLeft(y));
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",0 - margin.left)
      .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Loan Amount");

// Add the line
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
          .x(function (d) {
            return x(d.date)
          })
          .y(function (d) {
            if (d.value < 0) return;
            else return y(d.value);
          })
      )
}