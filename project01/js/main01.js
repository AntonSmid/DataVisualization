/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/





// load data from JSON file
let data = d3.json("data/revenues.json").then(function(data){
  //console.log(data);
  
  // convert revenue and profit to integers
  data.forEach(function(d){d.revenue = +d.revenue})
  data.forEach(function(d){d.profit = +d.profit})
  console.log(data);
  

// Variable  
let w = 400;
let h = 400;
let c = "#eaeaea";

// make SVG - Canvas  
let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", w)
    .attr("height", h);



// Band Scale
//      for x axe
let x = d3.scaleBand()
    .domain(data.map(function(d){return d.month;}))
    .range([0, w])
    .paddingInner(0.2)
    .paddingOuter(0.2);
  
  
// Linear scale
//      for y axe
let y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){ return d.revenue;  })])
    .range([0, h]);

  

// put the bars for the chart
let rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) {return x(d.month);})
      .attr("y", function(d) {return h - y(d.revenue);})
      .attr("width", x.bandwidth)
      .attr("height", function(d){return y(d.revenue);})
      .attr("fill", function(d){return "tomato"});

// text on the bars  
let texts = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){return d.revenue})
    .attr("font-family", "sans-serif")
    .attr("font-size", "12")
    .attr("text-anchor", "start")
    .attr("fill", "#fff")
    .attr("x", function(d) {return x(d.month) + 5;})
    .attr("y", function(d){return h - y(d.revenue) +15;});
  
// error catcher  
}).catch(function(error){
    console.log(error);
})
    









