import React from "react"

import ButtonProps from "./ButtonProps"
import styles from "./Button.module.scss"
import { 
    combineClassName,
} from "utils"


const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    fit = false,
    ...props
}) => {
    const st = combineClassName(styles)

    return (
        <div
            className={st(["wrapper", fit ? "fit": ""])}
            onClick={onClick}
            { ...props }
        >
            { children }
        </div>
    )
}


export default Button
