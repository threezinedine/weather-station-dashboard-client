import React from "react"

import InputProps from "./InputProps"


const Input: React.FC<InputProps> = ({
    name,
    label,
    value,
    password = false,
    onChange,
    onBlur,
    errorMessage,
}) => {
    return (
        <div>
            <label htmlFor={name}>{ label }</label>
            <input 
                name={name}
                value={value}
                type={ password ? "password" : "text" }
                onChange={onChange}
                onBlur={onBlur}
                data-testid={name} 
            /> 
            <div>
                { errorMessage }
            </div>
        </div>
    )
}


export default Input
