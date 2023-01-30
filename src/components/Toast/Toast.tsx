import React from "react"

import ToastProps from "./ToastProps"


const Toast: React.FC<ToastProps> = ({
    errorMessages,
    notifications,
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
            {
                notifications.map((notification: string, index: number) => (
                    <div
                        key={index}
                    >
                        { notification }
                    </div>
                )) 
            }
        </div>
    )
}


export default Toast
