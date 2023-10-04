export class Function {
    static precision = 0.001;

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