import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { 
    Modal,
} from "components"
import {
    MODAL_WRAPPER_TEST_ID, 
} from "const"


describe("<Modal testing />", () => {
    const modalLabel = "Hello World"
    const onCloseStub = jest.fn()
    const testTitle = "Login"

    const renderModal = (visible: boolean) => {
        render(
            <Modal
                visible={visible}
                title={testTitle}
                onClose={onCloseStub}
            >
                { modalLabel }
            </Modal>
        )
    }

    it("should not display the modal when nothing happen", () => {
        renderModal(false)
        expect(screen.queryByText(modalLabel)).toBeNull()
    })

    it("should display the content of the modal when the visible is passed", () => {
        renderModal(true)
        expect(screen.getByText(modalLabel)).toBeInTheDocument()
    })

    it("should call onClose event when click into the wrapper button not the modal content", () => {
        renderModal(true)

        userEvent.click(screen.getByTestId(MODAL_WRAPPER_TEST_ID))

        expect(onCloseStub).toHaveBeenCalledTimes(1)
    })
})
