import { Parser } from "/static/node_modules/expr-eval/dist/index.mjs";

// What operators to check for in the piecewise function (pwf)
const OPERATORS = ['<', '<=', '>', '>='];

// Generate the regex pattern given the operators.
const PATTERN = new RegExp('(' + OPERATORS.map(operator => operator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|') + ')');

// Splits the condition, so it can be evaluated piece by piece (10<x<15 -> ["10<x", "x<15"]
function splitExpr(expr) {
    // Split the expression using the regex pattern
    const result = expr.split(PATTERN);

    // Get the needed context for the condition to evaluate it.
    const comparisons = [];
    for (let i = 0; i < result.length; i += 3) {
        comparisons.push(result.slice(i, i + 3));
    }

    // append/prepend `x` to the conditions, so it can be evaluated one by one. prepend if first char is an operator, append if first character is a number.
    return comparisons.map(comparison => {
        if (OPERATORS.includes(comparison[1])) {
            return comparison.join('');
        } else if (OPERATORS.includes(comparison[0])) {
            return 'x' + comparison.join('');
        }
    });
}

// Evaluates a condition given an x value.
export function evalExpr(expr, x) {
    const expressions = splitExpr(expr); // Get each comparison to complete.

    // Loop through the expressions and evaluate each one, if any returns false, return false, otherwise return true.
    for (const subExpr of expressions) {
        const evalExpr = subExpr.replace('x', x.toString());
        if (Parser.evaluate(evalExpr, { x: x }) === false) {
            return false; // Condition failed.
        }
    }
    return true;
}