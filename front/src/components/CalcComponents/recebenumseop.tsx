import "../../pages/calc/calculadora.css"

interface Calc{
    number1:number;
    number2:number;
    operation:string;
}

function calculateResult(params:Calc) {
const {number1, number2, operation} = params
let res:number | string = 0

    switch (operation) {
        case "som":
            res = number1 + number2
            break

        case "sub":
            res = number1 - number2
            break;

        case "multi":
            res = number1 * number2;
            break;

        case "div":
            res = number1 / number2;
            break;

    }
    return res
}
export default calculateResult