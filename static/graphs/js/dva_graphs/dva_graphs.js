import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { MathFunction, PiecewiseFunction, preParseExpression } from "/static/graphs/js/dva_graphs/function.js";
import { Parser } from "/static/node_modules/expr-eval/dist/index.mjs";

// Declare the chart dimensions and margins.
const equation_error_div = document.getElementById("error-div")

const margin = { top: 20, bottom: 30, right: 20, left: 40}, 
      width  = 500,
      height = 650;

const graph_config = {
    line_color: "teal",
    stroke_width: 2,
    points: 100
}

// Declare the default axes
let domain = [0, 100];
let range = [-100, 100];

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


function plot(points, clear_graph=true) {
    // Clear any pre-existing plots
    if (clear_graph) {
        let lines = document.querySelectorAll("#line");
        lines.forEach(line => line.remove());
    }

    // Create the line object, mapping the x-scale (var x) and y-scale (var y) to points[0] and points[1] respectively
    let line = d3.line()
        .defined((d) => { return d[1] !== null; })
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(d3.curveNatural)

    // plot the points on the graph
    svg.append("path")
        .datum(points)
        .attr("clip-path", "url(#chart-area)")
        .attr("fill", "none")
        .attr("stroke", graph_config.line_color)
        .attr("stroke-width", graph_config.stroke_width)
        .attr("d", line)
        .attr("id", "line");
}


function appendAxes() {
    // update tracker variables
    domain = x.domain();
    range = y.domain();

    // Add the x-axis.
    let xAxis = svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .attr("class", "x-axis")
            .call(d3.axisBottom(x));

    // Add the y-axis.
    let yAxis = svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

    return [xAxis, yAxis];
}


function checkInput(expr, blank_is_true=false) {
    if (expr.length === 0) {
        if (blank_is_true)
            return 1;
        return 0;
    }

    let parsed;

    try        { parsed = Parser.parse(expr).toJSFunction("x"); }
    catch(err) { return parsed ?? 1; }

    return parsed;
}


function zoom(factor) {
    domain[0] *= factor;
    domain[1] *= factor;
    range[0] *= factor;
    range[1] *= factor;

    x.domain(domain).nice();
    y.domain(range).nice();

    axes[0].transition().duration(500).call(d3.axisBottom(x));
    axes[1].transition().duration(500).call(d3.axisLeft(y));

    // If graph is clear, don't plot it on zoom.
    if (document.querySelectorAll("#line").length > 0)
        plot();
}


function intakeFunctions() {
    // clear error
    equation_error_div.innerText = "";

    // take in input
    let tInputs = document.querySelectorAll(".table-input");
    let equations = [];
    let conditions = [];

    for (let i = 0; i < tInputs.length; i++) {
        let inp = tInputs[i];

        // Append all equations
        let inp_name = inp.getAttribute("name");

        if (inp_name === "equation" || inp_name === "condition") {
            let preparsed = preParseExpression(inp.value, ['x']); // Allows usage of implied multiplication

            let jsFunc_eq = checkInput(preparsed);

            if (jsFunc_eq === 0) continue;

            if (jsFunc_eq === 1) {
                equation_error_div.innerText = `Malformed Input (equation ${i + 1})`;
                continue;
            }

            if (inp_name === "equation") {
                equations.push(jsFunc_eq);
            } else if (inp_name === "condition") {
                conditions.push(jsFunc_eq);
            }

        }
    }

    // Create master function
    let PWF = new PiecewiseFunction();
    console.log(equations.length, equations)
    for (let i = 0; i < equations.length; i++) {
        let equation = new MathFunction(equations[i]);
        let condition = conditions[i];

        PWF.add_function(equation, condition);
    }

    // Plot points
    plot( PWF.toPointsArray(graph_config.points, domain[0], domain[1]), true );
}


function mouseCoords(e) {
    let current = document.activeElement.getAttribute("id");

    if (current !== "mouse-x" && current !== "mouse-y") {

        // get current mouse positions with relation to the svg
        let x = e.offsetX - margin.left;
        let y = -(e.offsetY - height + margin.bottom);

        // fix both values
        x = Math.floor( x * (domain[1] - domain[0]) / (width - margin.left - margin.right) + domain[0] + 0.5 );
        y = Math.floor( y * (range[1] - range[0]) / (height - margin.bottom - margin.top) + range[0] +  0.5 );

        document.getElementById("mouse-x").value = x;
        document.getElementById("mouse-y").value = y;
    }
}




document.getElementById("zoom-out").addEventListener("click", e => {
    if (e.button === 0) { zoom(+document.getElementById("factor").value); }
});

document.getElementById("zoom-in").addEventListener("click", e => {
    if (e.button === 0) { zoom(1 / +document.getElementById("factor").value); }
});

// Register event listeners
document.body.addEventListener("mousemove", mouseCoords);
document.getElementById("graph-btn").addEventListener("click", intakeFunctions);
