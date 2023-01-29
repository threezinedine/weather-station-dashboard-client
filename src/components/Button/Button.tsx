import React from "react"

import ButtonProps from "./ButtonProps"


const Button: React.FC<ButtonProps> = ({
    children,
}) => {
    return (
        <div>
            { children }
        </div>
    )
}


export default Button
