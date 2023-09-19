console.log("Vector Calculator");

const translations = {
    en: {
        magnitude: "Magnitude",
        direction: "Direction (degrees)",
        no_vectors: "Please put in at least two vectors",
    }
};

let rows = document.getElementsByClassName("table-row");
let bottomRow = rows[rows.length - 1];
bottomRow.addEventListener("keyup", addRow);


function clamp_n180_180(degrees) {
    degrees = degrees % 360;

    if (degrees > 180) {
        degrees -= 360;
    }
    return degrees;
}


function addRow(event) {
    let inputs = bottomRow.children; // actually the td wrappers for the inputs
    if (inputs[0].children[0].value !== "" || inputs[1].children[0].value !== "") { // check if the bottom row is not empty
        let row = document.createElement("tr");
        row.setAttribute("class", "table-row");

        // there has to be a better way to do this
        let box1 = document.createElement("td");
        box1.setAttribute("class", "table-box");
        let inp1 = document.createElement("input");
        inp1.setAttribute("class", "table-input");
        inp1.setAttribute("placeholder", translations.en.magnitude);
        box1.append(inp1);
        
        // but I don't know one
        let box2 = document.createElement("td");
        box2.setAttribute("class", "table-box");
        let inp2 = document.createElement("input");
        inp2.setAttribute("class", "table-input");
        inp2.setAttribute("placeholder", translations.en.direction);
        box2.append(inp2);

        row.append(box1, box2);
        document.getElementById("vector-table").children[0].appendChild(row);

        // update bottomRow and move the event listener onto it
        bottomRow.removeEventListener("keyup", addRow);
        rows = document.getElementsByClassName("table-row");
        bottomRow = rows[rows.length - 1];
        bottomRow.addEventListener("keyup", addRow);
    }
}


// I wish js had explicit typing so I could specify this function takes multiple vectors (i.e., vector: [i32; 2])
function addVectors(args) {
    let xTotal = 0;
    let yTotal = 0;
    let newX, newY;
    let stepsDiv = document.getElementById("steps-div");

    for (let i = 0; i < args.length; i++) {
        let vector = args[i];
        stepsDiv.innerText += `Converting vector: ${vector}\n`;

        if (vector[1] === 0) { // speed up the math for 0 degree cases to skip multiplying by 0 a lot
            stepsDiv.innerText += `Finished: (${vector[0]}, 0)\n`;
            xTotal += vector[0];
        } 
        else { // SOHCAHTOA
            newX = vector[0] * Math.cos(vector[1] * Math.PI / 180); // cos(degrees) = xDisp / magnitude
            newY = vector[0] * Math.sin(vector[1] * Math.PI / 180); // sin(degrees) = yDisp / magnitude

            stepsDiv.innerText += `${vector[0]} * cos(${vector[1]}) = ${newX}, ${vector[0]} * sin(${vector[1]}) = ${newY}\nFinished: (${newX}, ${newY})\n`;
            xTotal += newX;
            yTotal += newY;
        }
    }

    let finalMag = Math.sqrt(xTotal**2 + yTotal**2); // totalX^2 + totalY^2 = totalDisp^2
    let finalDir = Math.atan(yTotal / xTotal) * 180 / Math.PI; // tan(totalDegree) = totalY / totalX
    stepsDiv.innerText += `\nConversions complete. Totals:\nMagnitude: ${finalMag}\nDirection (raw): ${finalDir}\n`;

    let quad = 1;
    /* quadrant II:
        resulting angle (finalDir) will be negative because its the arctan of a negative number
        the angle relative to positive x-axis would be the angle adjacent to finalDir
        180 - abs(finalDir), or 180 + finalDir, is the angle in relation to the positive section of the x-axis
     or quad III:
         finalDir will be positive because its the arctan of a positive number
         the correct angle will be finalDir + 180
    */ 
    if (xTotal < 0)
    { finalDir += 180; quad = yTotal < 0 ? 3 : 2; }
    /* quadrant IV:
        finalDir will be negative
        because its in quadrant IV the angle measure relative to the x-axis in quad I ==
        360 - abs(finalDir) == 360 + finalDir
    */
    else if (yTotal < 0)
    { finalDir += 360; quad = 4; }

    if (quad !== 1)
    { stepsDiv.innerText += `Angle in Quadrant ${quad}. Refactoring angle to relate to origin.\nDirection (relative): ${finalDir}`; }

    return [finalMag, finalDir];
}


document.getElementById("calculate-button").addEventListener("click", calculate);

function calculate(event) {
    if (event.button === 0) {
        document.getElementById("steps-div").innerText = "";

        let vectorArray = [];

        for (let row of document.getElementsByClassName("table-row")) {
            if (row.children[0].children[0].value === "") { continue; }

            let mag = +row.children[0].children[0].value;
            if (Number.isNaN(mag) || mag === 0) { continue; }

            let dir = +row.children[1].children[0].value;
            if (Number.isNaN(dir)) { continue; }

            vectorArray.push([mag, dir]);
        }

        let outputDiv = document.getElementById("output-div");
        if (vectorArray.length < 1) {
            outputDiv.setAttribute("style", "color: red"); outputDiv.innerText = translations.en.no_vectors;
        }
        else {
            outputDiv.setAttribute("style", "color: black"); outputDiv.innerText = "";
            let answer = addVectors(vectorArray);
            let magDiv = document.createElement("div"); magDiv.innerText = "Magnitude: " + answer[0];
            let dirDiv = document.createElement("div"); dirDiv.innerText = "Direction: " + answer[1] + "°";
            let dirClampedDiv = document.createElement("div"); dirClampedDiv.innerText = "Direction (-180 to 180): " + clamp_n180_180(answer[1]) + "°";
            outputDiv.prepend(magDiv);
            outputDiv.append(dirDiv);
            outputDiv.append(dirClampedDiv);
        }
    }
}

document.getElementById("clear-button").addEventListener("click", clearTable);

function clearTable(event) {
    document.getElementById("steps-div").innerText = "";

    document.getElementById("vector-table").children[0].remove();
    let tBody = document.createElement("tbody");

    let tRow = document.createElement("tr"); tRow.setAttribute("class", "table-row");

    let tBox1 = document.createElement("td"); tBox1.setAttribute("class", "table-box");
    let inp1 = document.createElement("input"); inp1.setAttribute("class", "table-input"); inp1.setAttribute("placeholder", translations.en.magnitude);
    tBox1.append(inp1);

    let tBox2 = document.createElement("td"); tBox2.setAttribute("class", "table-box");
    let inp2 = document.createElement("input"); inp2.setAttribute("class", "table-input"); inp2.setAttribute("placeholder", translations.en.direction);
    tBox2.append(inp2);

    tRow.append(tBox1, tBox2);
    bottomRow = tRow;
    tRow.addEventListener("keyup", addRow);
    
    tBody.append(tRow);
    document.getElementById("vector-table").append(tBody);
}


let showMathDiv = document.getElementById("show-math");
showMathDiv.addEventListener("click", enableMathDisplay);

function enableMathDisplay(event) {
    if (event.button === 0) {
        if (showMathDiv.getAttribute("data-active") === "true") { 
            showMathDiv.setAttribute("style", "background-color: lightgray");
            showMathDiv.setAttribute("data-active", "false");
            document.getElementById("steps-div").setAttribute("style", "visibility: hidden");
        }
        else if (showMathDiv.getAttribute("data-active") === "false") {
            showMathDiv.setAttribute("style", "background-color: cadetblue");
            showMathDiv.setAttribute("data-active", "true");
            document.getElementById("steps-div").setAttribute("style", "visibility: visible");
        }
    }
}