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
    const notification = "Notification"
    const errorMessages = [firstErrorMessage, secondErrorMessage]
    const notifications = [notification]

    const renderTheToast = () => {
        render(
            <Toast 
                errorMessages={errorMessages}
                notifications={notifications}
            />
        ) 
    }

    it("should display all the errorMessages", () => {
        renderTheToast()

        expect(screen.getByText(firstErrorMessage)).toBeInTheDocument()
        expect(screen.getByText(secondErrorMessage)).toBeInTheDocument()
    })

    it("should display the notification", () => {
        renderTheToast()
        expect(screen.getByText(notification))
    })
})
