import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Modal,
} from "components"
import {
    MODAL_CANCEL_BUTTON_TEST_ID, 
    MODAL_SUBMIT_BUTTON_TEST_ID,
} from "const"


describe("<Modal testing />", () => {
    const modalLabel = "Hello World"

    const renderModal = (visible: boolean) => {
        render(
            <Modal
                visible={visible}
            >
                { modalLabel }
            </Modal>
        )
    }

    it("should not display the modal when nothing happen", () => {
        renderModal(false)
        expect(screen.queryByText(modalLabel)).toBeNull()
        expect(screen.queryByTestId(MODAL_CANCEL_BUTTON_TEST_ID)).toBeNull()
        expect(screen.queryByTestId(MODAL_SUBMIT_BUTTON_TEST_ID)).toBeNull()
    })

    it("should display the content of the modal when the visible is passed", () => {
        renderModal(true)
        expect(screen.getByText(modalLabel)).toBeInTheDocument()
    })

    it("should contain the submit button and cancel button", () => {
        renderModal(true)

        expect(screen.getByTestId(MODAL_CANCEL_BUTTON_TEST_ID)).toBeInTheDocument()
        expect(screen.getByTestId(MODAL_SUBMIT_BUTTON_TEST_ID)).toBeInTheDocument()
    })
})
