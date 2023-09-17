console.log("Vector Calculator");

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

        let breack = document.createElement("br");

        form.append(magLabel, mag, dirLabel, dir, submitter); // move to 3 lines instead of 1 w/ css
        document.getElementById("vectors-container").appendChild(form);
    }
}