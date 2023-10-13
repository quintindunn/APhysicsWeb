import { Parser } from "/static/node_modules/expr-eval/dist/index.mjs";

const OPERATORS = ['<', '<=', '>', '>='];

const PATTERN = new RegExp('(' + OPERATORS.map(operator => operator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|') + ')');

function splitExpr(expr) {
    const result = expr.split(PATTERN);
    const comparisons = [];
    for (let i = 0; i < result.length; i += 3) {
        comparisons.push(result.slice(i, i + 3));
    }
    return comparisons.map(comparison => {
        if (OPERATORS.includes(comparison[1])) {
            return comparison.join('');
        } else if (OPERATORS.includes(comparison[0])) {
            return 'x' + comparison.join('');
        }
    });
}

export function evalExpr(expr, x) {
    const expressions = splitExpr(expr);
    for (const subExpr of expressions) {
        const evalExpr = subExpr.replace('x', x.toString());
        if (Parser.evaluate(evalExpr, { x: x }) === false) {
            return false;
        }
    }
    return true;
}