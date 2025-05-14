import React, { useState } from "react";
import "./calculadora.css"

function Calc() {
    const [number, setNumber] = useState<string>("")
    const [number2, setNumber2] = useState<string>("")
    const [operacoes, setOperacoes] = useState<string>('')
    const [resultado, setResultado] = useState<number | string>('')
    const [historico, setHistorico] = useState<string[]>([])


    const changeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value)
    }
    const changeNumber2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumber2(e.target.value)
    }

    const calcular = () => {
        const n1 = Number(number);
        const n2 = Number(number2)
        let res: number | string = 0
        
        const simbols = {
            som: "+",
            sub: "-",
            multi: "*",
            div: "/",
        }[operacoes]

        switch (operacoes) {
            case "som":
                res = n1 + n2
                break

            case "sub":
                res = n1 - n2
                break;

            case "multi":
                res = n1 * n2;
                break;

            case "div":
                res = n1 / n2;
                break;
            
        }
        setResultado(res)




            setHistorico((prev) => [
                ...prev,
                `${number} ${simbols} ${number2} = ${res}`
            ])
        
    }






    return (
        <>
            <main>

                <div className="calculadora">
                    <h1>Calculadora basica</h1>
                    <input type="number" value={number} onChange={changeNumber} />

                    <select name="operações" id="operações" value={operacoes} onChange={(e) => setOperacoes(e.target.value)}>
                        <option value="">selecione</option>
                        <option value="som">+</option>
                        <option value="sub">-</option>
                        <option value="multi">*</option>
                        <option value="div">/</option>
                    </select>


                    <input type="number" value={number2} onChange={changeNumber2} />

                    <button onClick={calcular}>calcular {resultado}</button>


                    <ul>{historico.map((item, index) => (
                        <li key={index}> {item} </li>
                    ))}

                    </ul>

                </div>
            </main>

        </>
    )
}
export default Calc