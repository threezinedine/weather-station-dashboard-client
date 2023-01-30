import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Toast,
} from "components"
import {
    TOAST_ERROR_CLASS, 
    TOAST_NOTI_CLASS,
} from "const"


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

    it("should contain the error class inside the error message", () => {
        renderTheToast()

        expect(screen.getByText(firstErrorMessage).parentNode).toHaveClass(TOAST_ERROR_CLASS)
        expect(screen.getByText(secondErrorMessage).parentNode).toHaveClass(TOAST_ERROR_CLASS)
    })

    it("should contain the noti class inside the notification", () => {
        renderTheToast()

        expect(screen.getByText(notification).parentNode).toHaveClass(TOAST_NOTI_CLASS)
    })
})
