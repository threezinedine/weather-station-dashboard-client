import React, {
    useState,
} from "react"

import InputProps from "./InputProps"
import styles from "./Input.module.scss"
import {
    combineClassName,
} from "utils"


const Input: React.FC<InputProps> = ({
    name,
    label,
    value,
    password = false,
    onChange,
    onBlur,
    errorMessage,
}) => {

    const st = combineClassName(styles)
    const [onFocus, setOnFocus] = useState(false)
    
    return (
        <div className={st("wrapper")}>
            <label 
                className={st("label")}
                htmlFor={name}
            >
                { label }
            </label> 
            <br />
            <input 
                className={st(["input", onFocus && errorMessage === "" ? "enter" : "", errorMessage !== "" ? "error" : ""])}
                name={name}
                value={value}
                type={ password ? "password" : "text" }
                onChange={onChange}
                onBlur={() => {
                    setOnFocus(false)
                    onBlur()
                }}
                onFocus={() => {
                    setOnFocus(true)
                }}
                data-testid={name} 
            /> 
            <div
                className={st("error-message")}
            >
                { errorMessage }
            </div>
        </div>
    )
}


export default Input
