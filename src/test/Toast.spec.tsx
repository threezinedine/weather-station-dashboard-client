import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Toast,
} from "components"


describe("<Toast /> testing", () => {
    const firstErrorMessage = "First Error Message"
    const secondErrorMessage = "Second Error Message"
    const errorMessages = [firstErrorMessage, secondErrorMessage]

    const renderTheToast = () => {
        render(
            <Toast 
                errorMessages={errorMessages}
            />
        ) 
    }

    it("should display all the errorMessages as error class", () => {
        renderTheToast()

        expect(screen.getByText(firstErrorMessage)).toBeInTheDocument()
        expect(screen.getByText(secondErrorMessage)).toBeInTheDocument()
    })
})
