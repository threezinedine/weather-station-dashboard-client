import React from "react"

import ModalProps from "./ModalProps"


const Modal: React.FC<ModalProps> = ({
    children,
    visible = false,
}) => {
    return (
        <div>
            { visible && children }
        </div>
    )
}


export default Modal
