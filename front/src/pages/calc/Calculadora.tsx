import React, { useState } from "react";
import "./calculadora.css"
import calculateResult from "../../components/CalcComponents/recebenumseop";
import InputControls from "../../components/CalcComponents/inputsCalc";
import Historic from "../../components/CalcComponents/historicCalc";

function Calc() {
    const [number1, setNumber1] = useState<string>("")
    const [number2, setNumber2] = useState<string>("")
    const [operation, setOperation] = useState<string>('')
    const [historic, setHistoric] = useState<string[]>([])



    const calcular = () => {
        const n1 = Number(number1);
        const n2 = Number(number2)

        const res = calculateResult({number1:n1, number2:n2, operation:operation})
        
        const simbols = {
            som: "+",
            sub: "-",
            multi: "*",
            div: "/",
        }[operation]


        setHistoric((prev) => [
            ...prev,
            `${number1} ${simbols} ${number2} = ${res}`
        ])

    }






    return (
        <div>
            <main>
                <div className="calculadora">
                    <h1>CALCULADORA BASICA</h1>
                        <InputControls 
                            currentNumber1={number1}
                            onNumber1Change={setNumber1}
                            currentNumber2={number2}
                            onNumber2Change={setNumber2}
                            currentOperation={operation}
                            onOperationChange={setOperation}
                        />

                    <div className="result-calc">
                        <button id="button-calc" onClick={calcular}>calcular</button>
                    </div>
                    <Historic historic={historic} />
                </div>
            </main>
        </div>
    )
}
export default Calc