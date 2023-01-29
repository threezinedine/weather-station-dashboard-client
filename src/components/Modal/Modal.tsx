import React from "react"

import ModalProps from "./ModalProps"
import { 
    Button, 
} from "components"
import {
    MODAL_CANCEL_BUTTON_TEST_ID, 
} from "const"


const Modal: React.FC<ModalProps> = ({
    children,
    visible = false,
}) => {
    return (
        <div>
            {
                visible && (
                    <div>
                        { children }
                        <Button
                            data-testid={MODAL_CANCEL_BUTTON_TEST_ID}
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
