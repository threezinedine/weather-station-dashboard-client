import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { 
    Button,
} from "components"


describe("Testing button", () => {
    const buttonLabel = "Button"
    const mockOnClickFunction = jest.fn()
    const toggleItem = "Hello World"

    const renderButton = (label: string) => {
        render(
            <Button
                onClick={mockOnClickFunction}
            >
                { label }
            </Button>
        )
    }

    const renderButtonWithToggleItem = (label: string) => {
        render(
            <Button
                toggleItem={toggleItem}
            >
                { label } 
            </Button>
        )
    }

    it("should have the button text", () => {
        renderButton(buttonLabel)
        expect(screen.getByText(buttonLabel)).toBeInTheDocument()
    })

    it("should call onClick function when the button is clicked", () => {
        renderButton(buttonLabel)

        userEvent.click(screen.getByText(buttonLabel))

        expect(mockOnClickFunction).toHaveBeenCalledTimes(1)
    })

    it("should have not have the toggle menu when the button is not clicked", () => {
        renderButtonWithToggleItem(buttonLabel)

        expect(screen.queryByText(toggleItem)).toBeNull()
    })

    it("should display all toggle items when the click to the label button", () => {
        renderButtonWithToggleItem(buttonLabel)

        userEvent.click(screen.getByText(buttonLabel))

        expect(screen.getByText(toggleItem)).toBeInTheDocument()
    })
})
