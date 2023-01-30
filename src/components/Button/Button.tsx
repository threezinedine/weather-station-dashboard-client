import React, {
    useState,
} from "react"

import ButtonProps, {
    DropdownItemProps,
} from "./ButtonProps"
import styles from "./Button.module.scss"
import { 
    combineClassName,
} from "utils"
import {
    EMPTY_STRING,
} from "const"


const Button: React.FC<ButtonProps> = ({
    children,
    onClick = null,
    fit = false,
    noColor = false,
    haveHover = false,
    toggleItem = null,
    toggleMenu = true,
    leftTextAlign = false,
    wrapperStyle = EMPTY_STRING,
    ...props
}) => {
    const st = combineClassName(styles)
    const [displayToggleList, setDisplayToggleList] = useState(false)

    return (
        <div
            className={
                st([
                    "wrapper", 
                    "button",
                    wrapperStyle, 
                    fit ? "fit": "",
                    noColor ? "": "color-button",
                    haveHover ? "have-hover": "",
                    leftTextAlign ? "left-text": "center-text",
                ])
            }
            onClick={() => {
                if (onClick) {
                    onClick()
                } else {
                    setDisplayToggleList(!displayToggleList)
                }
                
            }}
            { ...props }
        >
            { children }
            {
                (toggleItem && displayToggleList) && (
                    <div className={st([
                        "toggle-list",
                        toggleMenu ? "menu": "",
                    ])}>
                        { toggleItem }
                    </div>
                )
            }
        </div>
    )
}


export default Button
