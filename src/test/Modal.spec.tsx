import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Modal,
} from "components"


describe("<Modal testing />", () => {
    const modalLabel = "Hello World"

    it("should not display the modal when nothing happen", () => {
        render(
            <Modal>
                { modalLabel }
            </Modal>
        )

        expect(screen.queryByText(modalLabel)).toBeNull()
    })
})
