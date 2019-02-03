/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/





// load data from JSON file
let data = d3.json("data/revenues.json").then(function(data){
  // console.log(data);
  
  // convert revenue and profit to integers
  data.forEach(function(d){d.revenue = +d.revenue})
  data.forEach(function(d){d.profit = +d.profit})
  // console.log(data);
  

// Variable  

let m = {top:10, right:10, bottom:100, left:100};  // margin
  
let w = 600 - m.left - m.right; // width
let h = 400 - m.top - m.bottom; // height

// make SVG - Canvas  
let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", w + m.left + m.right)
    .attr("height", h + m.top + m.bottom);
  
let g = svg 
    .append("g")
    .attr("transform", "translate(" + m.left + "," + m.top + ")");


// Band Scale
//  ...for x axe
let x = d3.scaleBand()
    .domain(data.map(function(d) {return d.month;} ))
    .range([0, w])
    .paddingInner(0.2)
    .paddingOuter(0.2);
  
  
// Linear scale
//  ...for y axe
let y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){ return d.revenue;  })])
    .range([h, 0]);

  

// put the bars for the chart
let rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) {return x(d.month);})
      .attr("y", function(d) {return y(d.revenue);})
      .attr("width", x.bandwidth)
      .attr("height", function(d){return h - y(d.revenue);})
      .attr("fill", function(d){return "tomato"});

// text on the bars  
let texts = g.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){return d.revenue})
    .attr("font-family", "sans-serif")
    .attr("font-size", "12")
    .attr("text-anchor", "start")
    .attr("fill", "#fff")
    .attr("x", function(d) {return x(d.month) + 5;})
    .attr("y", function(d){return y(d.revenue) +15;});
  
  
  // Axis
  let xAxisCall = d3.axisBottom(x);
  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + h + ")")
      .call(xAxisCall);
  
  
  let yAxisCall = d3.axisLeft(y)
          .ticks(5)
          .tickFormat(function(d){return "$" + d});
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);
  

  // Labels
  // x label
  g.append("text")
      .attr("class", "x axis-label")
      .attr("x", w / 2)
      .attr("y", h + 50)
      .attr("font-size", "24px")
      .attr("text-anchor", "middle")
      .text("Months");    
  
  // y label
  g.append("text")
      .attr("class", "y axis-label")
      .attr("x", - (h / 2))
      .attr("y", -70)
      .attr("font-size", "24px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Revenue ($)");
  
  
  
// error catcher  
}).catch(function(error){
    console.log(error);
})
    









