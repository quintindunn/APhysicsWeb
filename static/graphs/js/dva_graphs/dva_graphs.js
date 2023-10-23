import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { MathFunction, PiecewiseFunction } from "/static/graphs/js/dva_graphs/function.js";
import { evalExpr } from "./condition_processing.js";

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

// Other global variables
let pwf;  // Piecewise function


// Plots a function on the graph given the points.
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


function checkInput(expr, is_condition=false) {
    const CODES = {
        SKIP: 0,
        ERROR: 1
    }
    if (expr.length === 0) {
        return CODES.SKIP;
    }

    // Special treatment for conditions so parsing conditions like 10<x<15 is possible
    if (is_condition) {
        // Check if it is valid
        try {
            math.evaluate(['t=0', expr]);
        } catch (err) {
            return CODES.ERROR;
        }

        // Return a partially formed function already containing the expression, just needing the x value.
        return (x) => {
            return evalExpr(expr, x);
        };
    }

    let parsed;

    try {
        // Test expression to make sure it is valid.
        math.evaluate(["t=" + 0, expr])

        // Return a function that takes `x` to evaluate the expr.
        parsed = (x) => {return math.evaluate(["t=" + x, expr])[1]};
    }
    catch(err) {
        return parsed ?? CODES.ERROR; // expression is invalid
    }

    return parsed;
}


// Zooms the graph by multiplying the axes
function zoom(factor) {
    if (factor == -Infinity || factor == Infinity || factor == NaN || factor === 0) { return; }

    domain[0] *= factor;
    domain[1] *= factor;
    range[0] *= factor;
    range[1] *= factor;

    // Round the number, so it increments/decrements correctly, needed because binary floating point arithmetic.
    x.domain(domain).nice();
    y.domain(range).nice();

    axes[0].transition().duration(500).call(d3.axisBottom(x));
    axes[1].transition().duration(500).call(d3.axisLeft(y));

    // If graph is clear, don't plot it on zoom.
    if (document.querySelectorAll("#line").length > 0)
        plot(pwf.toPointsArray(graph_config.points, domain[0], domain[1]), true);
}


// Takes the equation-condition pairs from the table and graphs them
function graph_function() {
    // Clear any errors
    equation_error_div.innerText = "";

    // Collect inputs from table
    let tInputs = document.querySelectorAll(".table-input");

    let equations = [];
    let conditions = [];

    // Loop through inputs and parse them
    for (let i = 0; i < tInputs.length; i++) {
        let inp = tInputs[i];

        // Type of input, (equation or condition)
        let inp_name = inp.getAttribute("name");

        // Redundancy check.
        if (inp_name === "equation" || inp_name === "condition") {
            const expr = inp.value.replaceAll("x", "t") // Use `t` instead of `x` as mathjs throws an error with 0x

            // Validate the input, if it's true returns a function where you pass in the `x` value.
            let jsFunc_eq = checkInput(expr, inp_name === "condition");

            // Blank, skip the expr.
            if (jsFunc_eq === 0) continue;

            // Error, either the condition or equation is invalid.
            if (jsFunc_eq === 1) {
                equation_error_div.innerText = `Malformed Input (equation ${i + 1})`;
                continue;
            }

            // Append the equations and conditions.
            if (inp_name === "equation") {
                equations.push(jsFunc_eq);
            } else if (inp_name === "condition") {
                conditions.push(jsFunc_eq);
            }

        }
    }

    // Create master function
    pwf = new PiecewiseFunction();

    for (let i = 0; i < equations.length; i++) {
        let equation = new MathFunction(equations[i]);
        let condition = conditions[i];

        // Add function and condition to the master pwf.
        pwf.add_function(equation, condition);
    }

    // Plot the points to the graph.
    plot( pwf.toPointsArray(graph_config.points, domain[0], domain[1]), true );
}


// Displays the current x, y coordinates of the mouse cursor in inputs.
function mouseCoords(e) {
    let current = document.activeElement.getAttribute("id");

    if (current !== "mouse-x" && current !== "mouse-y") {

        // Get current mouse positions with relation to the svg.
        let x = e.offsetX - margin.left;
        let y = -(e.offsetY - height + margin.bottom);

        // Fix both values, so it cannot extend past the domain/range.
        x = Math.floor( x * (domain[1] - domain[0]) / (width - margin.left - margin.right) + domain[0] + 0.5 );
        y = Math.floor( y * (range[1] - range[0]) / (height - margin.bottom - margin.top) + range[0] +  0.5 );

        // Display in the inputs.
        document.getElementById("mouse-x").value = x;
        document.getElementById("mouse-y").value = y;
    }
}


// Register event listeners
document.getElementById("zoom-out").addEventListener("click", e => {
    if (e.button === 0) { zoom(+document.getElementById("factor").value); }
});

document.getElementById("zoom-in").addEventListener("click", e => {
    if (e.button === 0) { zoom(1 / +document.getElementById("factor").value); }
});


document.body.addEventListener("mousemove", mouseCoords);
document.getElementById("graph-btn").addEventListener("click", graph_function);
