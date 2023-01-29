import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Modal,
} from "components"


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
    })

    it("should display the content of the modal when the visible is passed", () => {
        renderModal(true)
        expect(screen.getByText(modalLabel)).toBeInTheDocument()
    })
})
