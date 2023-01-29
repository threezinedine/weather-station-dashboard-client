import React from "react"

import ButtonProps from "./ButtonProps"
import styles from "./Button.module.scss"
import { 
    combineClassName,
} from "utils"
import {
    EMPTY_STRING,
} from "const"


const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    fit = false,
    noColor = false,
    haveHover = false,
    wrapperStyle = EMPTY_STRING,
    ...props
}) => {
    const st = combineClassName(styles)

    return (
        <div
            className={
                st([
                    "wrapper", 
                    wrapperStyle, 
                    fit ? "fit": "",
                    noColor ? "": "color-button",
                    haveHover ? "have-hover": "",
                ])
            }
            onClick={onClick}
            { ...props }
        >
            { children }
        </div>
    )
}


export default Button
