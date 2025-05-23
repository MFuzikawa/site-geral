
interface HistoricProps {
    historic: string[]
}

function Historic({ historic }: HistoricProps) {

    return (
        <div className="historic-calc">

            <ul>{historic.map((item, index) => (
                <li key={index}> {item} </li>
            ))}
            </ul>

        </div>
    )
}
export default Historic