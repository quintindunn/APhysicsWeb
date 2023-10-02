let function_table = document.getElementById("function-table");
let rows = document.getElementsByClassName("table-row");
let bottomRow = rows[rows.length - 1];


const translations = {
    en: {
        equation: "Equation",
        condition: "Condition"
    }
}


function createRow() {
    let input = document.createElement("input");
        input.setAttribute("class", "table-input");
        input.setAttribute("placeholder", translations.en.equation);
        input.setAttribute("name", "equation");

    let tBox1 = document.createElement("td");
        tBox1.setAttribute("class", "table-box");
        tBox1.append(input);

    input = document.createElement("input");
        input.setAttribute("class", "table-input");
        input.setAttribute("placeholder", translations.en.condition);
        input.setAttribute("name", "condition");

    let tBox2 = document.createElement("td");
        tBox2.setAttribute("class", "table-box");
        tBox2.append(input);


    let tRow = document.createElement("tr");
        tRow.setAttribute("class", "table-row");
        tRow.append(tBox1, tBox2);

    return tRow;
}

function addRow(event) {
    let inputs = bottomRow.children; // The actual td wrappers for the inputs

    // check if the bottom row is not empty
    if (inputs[0].children[0].value !== "" || inputs[1].children[0].value !== "") {
        let row = createRow();

        function_table.children[0].appendChild(row);

        // Update bottomRow and move the event listener onto it
        bottomRow.removeEventListener("keyup", addRow);
        rows = document.getElementsByClassName("table-row");
        bottomRow = rows[rows.length - 1];
        bottomRow.addEventListener("keyup", addRow);
    }
}

bottomRow.addEventListener("keyup", addRow);
