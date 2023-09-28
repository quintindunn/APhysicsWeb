// import {Parser} from "/static/node_modules/expr-eval/dist/index.mjs"

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare the chart dimensions and margins.
const margin = { top: 20, bottom: 30, right: 20, left: 40}, 
      width  = 640,
      height = 640;

// Declare the default axes
let domain = [0, 100];
let range = [0, 100];

// Declare the x (horizontal position) scale.
const x = d3.scaleLinear( domain, [margin.left, width - margin.right] );

// Declare the y (vertical position) scale.
const y = d3.scaleLinear( range, [height - margin.bottom, margin.top] );

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// add axes to svg and store them in a variable
let axes = appendAxes();

// Append the SVG element.
container.append(svg.node());




function appendAxes() {
    // update tracker variables
    domain = x.domain();
    range = y.domain();

    // Add the x-axis.
    let xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

    // Add the y-axis.
    let yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

    return [xAxis, yAxis];
}

function zoom(factor) {
    domain[1] *= factor;
    range[1] *= factor;

    x.domain(domain).nice();
    y.domain(range).nice();

    axes[0].transition().duration(500).call(d3.axisBottom(x));
    axes[1].transition().duration(500).call(d3.axisLeft(y));
}

document.getElementById("zoom-out").addEventListener("click", e => zoom(10) );
document.getElementById("zoom-in").addEventListener("click", e => zoom(0.1) );
// console.log(Parser.evaluate('6 * x^2', { x: 7 }));