import React from "react"

import ModalProps from "./ModalProps"
import { 
    Button, 
} from "components"
import {
    MODAL_CANCEL_BUTTON_TEST_ID, 
    MODAL_WRAPPER_TEST_ID, 
} from "const"


const Modal: React.FC<ModalProps> = ({
    children,
    onClose,
    visible = false,
}) => {
    return (
        <div
            data-testid={ MODAL_WRAPPER_TEST_ID }
            onClick={onClose}
        >
            {
                visible && (
                    <div>
                        { children }
                        <Button
                            data-testid={MODAL_CANCEL_BUTTON_TEST_ID}
                            onClick={(evt: any) => {
                                evt.stopPropagation() 
                                onClose()
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                )
            }
        </div>
    )
}


export default Modal
