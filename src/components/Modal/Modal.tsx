import React from "react"

import ModalProps from "./ModalProps"
import {
    MODAL_WRAPPER_TEST_ID, 
} from "const"
import { 
    combineClassName,
} from "utils"
import styles from "./Modal.module.scss"


const Modal: React.FC<ModalProps> = ({
    children,
    title,
    onClose,
    visible = false,
}) => {
    const st = combineClassName(styles)

    return (
        <div
            data-testid={ MODAL_WRAPPER_TEST_ID }
            onClick={(evt: any) => {
                if (evt.target.dataset.testid === MODAL_WRAPPER_TEST_ID) {
                    onClose()
                }
            }}
            className={st([
                "wrapper",
                visible ? "": "display-none"
            ])}
        >
            {
                visible && (
                    <div className={st("modal")}>
                        <div className={st("modal__title")}>
                            { title }
                        </div>
                        <div className={st("modal__content")}>
                            { children }
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default Modal
