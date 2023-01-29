import React from "react"

import ButtonProps from "./ButtonProps"


const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return (
        <div
            { ...props }
            onClick={onClick}
        >
            { children }
        </div>
    )
}


export default Button
