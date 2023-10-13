import { Parser } from "/static/node_modules/expr-eval/dist/index.mjs";


const precision = 0.001;

export class MathFunction {
    constructor(func) {
        this.func = func;
    }

    yAt(x) {
        return this.func(x);
    }

    slopeAt(x) {
        let deltaX = Math.max(x * precision, precision);

        return ( this.func(x + deltaX) - this.func(x - deltaX) ) / deltaX;
    }

    toPointsArray(points, min, max) {
        let range = max - min;
        let pointsArr = new Array(max - min);
        let change = range / points;
        let currentX = min;

        for (let i = 0; i < range; i++) {
            pointsArr[i] = [currentX, this.func(currentX)];
            currentX += change;
        }

        return pointsArr;
    }
}

export class PiecewiseFunction {
    constructor() {
        this.functions = []; // 2D Array of function-condition pairs.
    }

    add_function(func, condition) {
        this.functions.push([func, condition]);
    }

    iterate(x) {
        for (let func_idx = 0; func_idx < this.functions.length; func_idx++) {
            let func_attrs = this.functions[func_idx];

            let func = func_attrs[0];
            let cond = func_attrs[1];

            // Check the condition.
            if (cond === undefined || cond(x)) // If the condition is true, use that function
                return func.yAt(x);
        }
    }

    toPointsArray(points, min, max) {
        let range = max - min;
        let pointsArr = new Array(max - min);
        let change = range / points;
        let currentX = min;

        for (let i = 0; i < range; i++) {
            let y = this.iterate(currentX);
            if (y === undefined)
                y = null;
            pointsArr[i] = [currentX, y];
            currentX += change;

        }
        return pointsArr;
    }


}