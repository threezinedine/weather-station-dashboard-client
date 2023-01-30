import React from "react"

import ToastProps from "./ToastProps"


const Toast: React.FC<ToastProps> = ({
    errorMessages,
}) => {
    return (
        <div>
            {
                errorMessages.map((errorMessage: string, index: number) => (
                    <div
                        key={index}
                    >
                        { errorMessage }
                    </div>
                ))
            } 
        </div>
    )
}


export default Toast
