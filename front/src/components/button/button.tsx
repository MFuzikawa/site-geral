import React from "react";

interface ButtonProps{
    readonly click: ()=> void
    readonly children: React.ReactNode
    readonly id?: string
}

function Button({click, children, id}:ButtonProps){

    return(
        <button id={id} onClick={click}>{children}</button>
    )
}
export default Button