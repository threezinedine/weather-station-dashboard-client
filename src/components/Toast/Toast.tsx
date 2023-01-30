import React from "react"

import ToastProps from "./ToastProps"
import { 
    combineClassName,
} from "utils"
import styles from "./Toast.module.scss"


const Toast: React.FC<ToastProps> = ({
    errorMessages,
    notifications,
}) => {
    const st = combineClassName(styles)

    return (
        <div>
            {
                errorMessages.map((errorMessage: string, index: number) => (
                    <div
                        key={index}
                        className={st("error")}
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
