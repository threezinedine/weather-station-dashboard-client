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
    toggleList = null,
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
                    wrapperStyle, 
                    fit ? "fit": "",
                    noColor ? "": "color-button",
                    haveHover ? "have-hover": "",
                ])
            }
            onClick={() => {
                onClick && onClick()
                !onClick && setDisplayToggleList(!displayToggleList)
            }}
            { ...props }
        >
            { children }
            <div>
                {
                    (toggleList && displayToggleList) && (
                        toggleList.map((item: DropdownItemProps) => (
                            <div
                                key={item.label}
                                onClick={item.onClick}
                            >
                                { item.label } 
                            </div>
                        )) 
                    )
                }
            </div>
        </div>
    )
}


export default Button
