import { useState } from "react"
import './button.css'

function Button() {
    const [State, setState] = useState<number>(0)
    const addState = ()=> {setState(State + 1)}
    return(
        <>
        <button onClick={addState}> você clicou {State} vezes</button>
        </>
    )
}
export default Button