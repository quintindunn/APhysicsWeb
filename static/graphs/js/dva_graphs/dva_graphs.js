// import {Parser} from "/static/node_modules/expr-eval/dist/index.mjs"

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare the chart dimensions and margins.
const margin = { top: 20, bottom: 30, right: 20, left: 40}, 
      width  = 500,
      height = 500;

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


document.getElementById("zoom-out").addEventListener("click", e => {
    if (e.button == 0) { zoom(+document.getElementById("factor").value); }
});

document.getElementById("zoom-in").addEventListener("click", e => {
    if (e.button == 0) { zoom(1 / +document.getElementById("factor").value); }
});


function mouseCoords(event) {
    let current = document.activeElement.getAttribute("id");

    if (current !== "mouse-x" && current !== "mouse-y") {

        // get current mouse positions with relation to the svg
        let x = event.offsetX - margin.left;
        let y = -(event.offsetY - height + margin.bottom);

        // fix both values
        x = Math.floor(x / (width - margin.left - margin.right) * domain[1] + 0.5);
        y = Math.floor(y / (height - margin.bottom - margin.top) * range[1] + 0.5);

        document.getElementById("mouse-x").value = x;
        document.getElementById("mouse-y").value = y;

    }
}

document.body.addEventListener("mousemove", mouseCoords);