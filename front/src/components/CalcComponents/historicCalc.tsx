import "../../pages/calc/calculadora.css"

interface HistoricProps {
    readonly historic: string[]
}

function Historic({ historic }: HistoricProps) {

    return (
        <div className="historic-calc">

            <ul>{historic.map((item, index) => (
                <li key={index} id="lista-historico-calc"> {item} </li>
            ))}
            </ul>

        </div>
    )
}
export default Historic