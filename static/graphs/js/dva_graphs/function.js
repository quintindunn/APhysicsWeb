// How precise should the slope be?
const precision = 0.001;

// Class for the equations
export class MathFunction {
    constructor(func) {
        this.func = func;
    }

    // Evaluate the equation at a given x value.
    yAt(x) {
        return this.func(x);
    }

    // Evaluates the slope at a given x value.
    slopeAt(x) {
        let deltaX = Math.max(x * precision, precision);

        return ( this.func(x + deltaX) - this.func(x - deltaX) ) / deltaX;
    }

    // Generate an array of x,y pairs for graphing.
    toPointsArray(points, min, max) {
        let range = max - min;  // What points to graph it in between.

        let pointsArr = new Array(max - min);

        let change = range / points; // What to increment the x value by, more points = a greater resolution
        let currentX = min;

        for (let i = 0; i < range; i++) {
            pointsArr[i] = [currentX, this.func(currentX)];  // Set pointsArr[i] to the x, y pair.
            currentX += change;
        }

        return pointsArr;
    }
}

// Class for piecewise functions (pwf)
export class PiecewiseFunction {
    constructor() {
        this.functions = []; // 2D Array of function-condition pairs.
    }

    // Adds an equation, condition pair to the pwf for later evaluation.
    add_function(func, condition) {
        this.functions.push([func, condition]);
    }

    // Solves the pwf for a given x value.
    iterate(x) {
        // Loop through the functions and conditions to find a valid expr, cond to evaluate.
        for (let func_idx = 0; func_idx < this.functions.length; func_idx++) {
            let func_attrs = this.functions[func_idx];

            let func = func_attrs[0];
            let cond = func_attrs[1];
            // Check the condition, if the condition is true, use that function, is there is no condition it's true.
            if (cond === undefined || cond(x))
                return func.yAt(x);
        }
        return null;  // No valid function was found to evaluate, there will be a hole in the graph here.
    }

    // Generate an array of x,y pairs for graphing.
    toPointsArray(points, min, max) {
        let range = max - min;  // What points to graph it in between.

        let pointsArr = new Array(max - min);

        let change = range / points; // What to increment the x value by, more points = a greater resolution
        let currentX = min;

        for (let i = 0; i < range; i++) {
            pointsArr[i] = [currentX, this.iterate(currentX)];  // Set pointsArr[i] to the x, y pair.
            currentX += change;
        }

        return pointsArr;
    }
}