console.log("Vector Calculator");

let rows = document.getElementsByClassName("table-row");
let bottomRow = rows[rows.length - 1];
bottomRow.addEventListener("keyup", addRow);

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
        inp1.setAttribute("placeholder", "Magnitude");
        box1.appendChild(inp1);
        
        // but I don't know one
        let box2 = document.createElement("td");
        box2.setAttribute("class", "table-box");
        let inp2 = document.createElement("input");
        inp2.setAttribute("class", "table-input");
        inp2.setAttribute("placeholder", "Direction");
        box2.appendChild(inp2);

        row.append(box1, box2);
        document.getElementById("vector-table").children[0].appendChild(row);

        // update bottomRow and move the event listener onto it
        bottomRow.removeEventListener("keyup", addRow);
        rows = document.getElementsByClassName("table-row");
        bottomRow = rows[rows.length - 1];
        bottomRow.addEventListener("keyup", addRow);
    }
}











/*
document.getElementById("vector-button").addEventListener("click", createForm);

function createForm(event) {
    if (event.button == 0) {
        let form = document.createElement("form");
        form.id = "vector-form";
        form.method = "post";

        let mag = document.createElement("input");
        mag.id = "vector-magnitude";
        mag.placeholder = "meters";
        mag.type = "text";
        mag.name = "magnitude";
        mag.required = true;

        let magLabel = document.createElement("label");
        magLabel.for = "magnitude";
        magLabel.innerHTML = "Magnitude: ";

        let dir = document.createElement("input");
        dir.id = "vector-direction";
        dir.placeholder = "degrees";
        dir.type = "text";
        dir.name = "direction";
        dir.required = true;

        let dirLabel = document.createElement("label");
        dirLabel.for = "direction";
        dirLabel.innerHTML = "Direction: ";

        let submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.value = "Create";

        form.append(magLabel, mag, dirLabel, dir, submitter); // move to 3 lines instead of 1 w/ css pls
        document.getElementById("vectors-container").appendChild(form);
    }
}
*/