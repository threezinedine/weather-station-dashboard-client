import React from "react"

import ModalProps from "./ModalProps"
import { 
    Button, 
} from "components"
import {
    MODAL_CANCEL_BUTTON_TEST_ID, 
    MODAL_SUBMIT_BUTTON_TEST_ID,
} from "const"


const Modal: React.FC<ModalProps> = ({
    children,
    visible = false,
}) => {
    return (
        <div>
            { visible && children }
            <Button
                data-testid={MODAL_CANCEL_BUTTON_TEST_ID}
            >
                Cancel
            </Button>
            <Button
                data-testid={MODAL_SUBMIT_BUTTON_TEST_ID}
            >
                Submit
            </Button>
        </div>
    )
}


export default Modal
