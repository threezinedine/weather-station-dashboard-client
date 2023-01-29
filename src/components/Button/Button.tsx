import React from "react"

import ButtonProps from "./ButtonProps"


const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
        >
            { children }
        </div>
    )
}


export default Button
