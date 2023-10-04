import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare the chart dimensions and margins.
const margin = { top: 20, bottom: 30, right: 20, left: 40}, 
      width  = 500,
      height = 500;

const graph_config = {
    line_color: "teal",
    stroke_width: 2
}

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


let points = [[0, 65], [1, 55], [2, 94], [3, 89], [4, 93], [5, 62], [6, 11], [7, 21], [8, 37], [9, 64], [10, 39], [11, 80], [12, 4], [13, 2], [14, 36], [15, 30], [16, 77], [17, 87], [18, 43], [19, 24], [20, 88], [21, 36], [22, 19], [23, 43], [24, 19], [25, 96], [26, 81], [27, 51], [28, 98], [29, 93], [30, 74], [31, 33], [32, 18], [33, 11], [34, 76], [35, 5], [36, 40], [37, 51], [38, 2], [39, 62], [40, 6], [41, 12], [42, 9], [43, 95], [44, 97], [45, 34], [46,
88], [47, 89], [48, 58], [49, 77], [50, 24], [51, 29], [52, 86], [53, 63], [54, 25], [55, 52], [56, 94], [57, 6], [58, 13], [59, 3], [60, 36], [61, 51], [62, 18], [63, 1], [64, 40], [65, 29], [66, 73], [67, 88], [68, 88], [69, 100], [70, 67], [71, 39], [72, 68], [73, 73], [74, 3], [75, 100], [76, 75], [77, 24], [78, 48], [79, 29], [80, 51], [81, 81], [82, 89], [83, 15], [84, 16], [85, 8], [86, 10], [87, 73], [88, 74], [89, 65], [90, 96], [91, 36], [92, 7], [93, 42], [94, 89], [95, 53], [96, 39], [97, 46], [98, 69], [99, 53], [100, 35], [101, 59], [102, 44], [103, 73], [104, 97], [105, 74], [106, 18], [107, 39], [108, 44], [109, 48], [110, 83], [111, 48], [112, 22], [113, 96], [114, 40], [115, 96], [116, 86], [117, 60], [118, 89], [119, 76], [120, 37], [121, 100], [122, 58], [123, 96], [124, 54], [125, 7], [126, 45], [127, 35], [128, 7], [129, 37], [130, 8], [131, 65], [132, 72], [133, 0], [134, 76], [135, 90], [136, 42], [137, 1], [138, 80], [139, 89], [140, 6], [141, 66], [142, 67], [143, 47], [144, 59], [145, 90], [146, 31], [147, 94], [148, 66], [149, 90], [150, 77], [151, 19], [152, 100], [153, 33], [154, 0], [155, 21], [156, 43], [157, 44], [158, 15], [159, 77], [160, 36], [161, 86], [162, 72], [163, 85], [164, 59], [165, 90], [166, 74], [167, 58], [168, 28], [169, 100], [170, 74], [171, 63], [172, 93], [173, 2], [174, 78], [175, 46], [176, 17], [177, 59], [178, 0], [179, 37], [180, 71], [181, 51], [182, 1], [183, 42], [184, 31], [185, 0], [186, 78], [187, 94], [188, 51], [189, 100], [190, 66], [191, 92], [192, 3], [193, 11], [194, 65], [195, 33], [196, 0], [197, 7], [198, 95], [199, 77], [200, 77], [201, 45], [202, 72], [203, 86], [204, 31], [205, 84], [206, 0], [207, 44], [208, 4], [209, 41], [210, 66], [211, 83], [212, 81], [213, 64], [214, 5], [215, 88], [216,
95], [217, 13], [218, 86], [219, 46], [220, 43], [221, 83], [222, 59], [223, 56], [224, 48], [225, 46], [226, 79], [227, 55], [228, 21], [229, 30], [230, 4], [231, 12], [232, 60], [233, 27], [234, 45], [235, 31], [236, 60], [237, 56], [238, 20], [239, 6], [240, 64], [241, 89], [242, 3], [243, 94], [244, 42], [245, 77], [246, 76], [247, 15], [248, 93], [249, 2], [250, 9], [251, 85], [252, 70], [253, 35], [254, 62], [255, 96], [256, 17], [257, 58], [258, 45], [259, 91], [260, 24], [261, 4], [262, 3], [263, 20], [264, 56], [265, 42], [266, 28], [267, 58], [268, 60], [269, 97], [270, 65], [271, 26], [272, 95], [273, 76], [274, 59], [275, 18], [276, 41], [277, 98], [278,
60], [279, 33], [280, 29], [281, 37], [282, 52], [283, 54], [284, 18], [285, 50], [286, 50], [287, 21], [288, 47], [289, 7], [290, 37], [291, 78], [292, 88], [293, 12], [294, 67], [295, 59], [296, 94], [297, 71], [298, 33], [299, 83], [300, 80], [301, 62], [302, 47], [303, 22], [304, 55], [305, 11], [306, 45], [307, 3], [308, 93], [309, 9], [310, 78], [311, 32], [312, 87], [313, 63], [314, 20], [315, 22], [316, 1], [317, 87], [318, 14], [319, 13], [320, 75], [321, 18], [322, 47], [323, 9], [324, 62], [325, 29], [326, 83], [327, 15], [328, 67], [329, 64], [330, 18], [331, 4], [332, 22], [333, 49], [334, 13], [335, 10], [336, 90], [337, 48], [338, 19], [339, 53], [340, 87], [341, 71], [342, 31], [343, 27], [344, 48], [345, 74], [346, 44], [347, 84], [348, 18], [349, 43], [350, 0], [351, 1], [352, 50], [353, 84], [354, 51], [355, 54], [356, 12], [357, 14], [358, 44], [359, 98], [360, 65], [361, 24], [362, 75], [363, 35], [364, 33], [365, 24], [366, 57], [367, 61], [368, 77], [369, 70], [370, 99], [371, 3], [372, 96], [373, 14], [374, 66], [375, 23], [376, 30], [377, 48], [378, 68], [379, 49], [380, 35], [381, 79], [382, 71], [383, 7], [384, 3], [385, 72], [386, 23], [387, 41], [388, 8], [389, 56], [390, 29], [391, 97], [392, 52], [393, 8], [394, 28], [395, 39], [396, 10], [397, 55], [398, 7], [399, 13]];

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

    // If graph is clear, don't plot it on zoom.
    if (document.querySelectorAll("#line").length > 0)
        plot();
}


document.getElementById("zoom-out").addEventListener("click", e => {
    if (e.button === 0) { zoom(+document.getElementById("factor").value); }
});

document.getElementById("zoom-in").addEventListener("click", e => {
    if (e.button === 0) { zoom(1 / +document.getElementById("factor").value); }
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


function plot(clear_graph=true) {
    // Clear any pre-existing plots
    if (clear_graph) {
        let lines = document.querySelectorAll("#line");
        lines.forEach((line) => {
           line.remove();
        });
    }

    // Create the line object, mapping the x-scale (var x) and y-scale (var y) to points[0] and points[1] respectively
    let line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(d3.curveNatural);

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

// Register event listeners
document.body.addEventListener("mousemove", mouseCoords);
document.getElementById("graph-btn").addEventListener("click", plot);
