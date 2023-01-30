import React from "react"
import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"
import {
    faCircleCheck,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons"

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
        <div className={st("toast")}>
            {
                errorMessages.map((errorMessage: string, index: number) => (
                    <div
                        key={index}
                        style={{
                            "--i": index
                        } as React.CSSProperties}
                        className={st([
                            "toast__message",
                            "error",
                        ])}
                    >
                        <div className={st("toast__message__icon")}>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                        </div>
                        <div className={st("toast__message__message")}>
                            { errorMessage }
                        </div>
                    </div>
                ))
            } 
            {
                notifications.map((notification: string, index: number) => (
                    <div
                        key={index}
                        style={{
                            "--i": index + errorMessages.length
                        } as React.CSSProperties}
                        className={st([
                            "toast__message",
                            "noti",
                        ])}
                    >
                        <div className={st("toast__message__icon")}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                        <div className={st("toast__message__message")}>
                            { notification }
                        </div>
                    </div>
                )) 
            }
        </div>
    )
}


export default Toast
