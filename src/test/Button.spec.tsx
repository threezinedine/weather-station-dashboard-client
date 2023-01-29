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

    const firstItemToggleListLabel = "Item 1"
    const firstItemToggleListMockFunction = jest.fn()

    const secondItemToggleListLabel = "Item 1"
    const secondItemToggleListMockFunction = jest.fn()

    const renderButton = (label: string) => {
        render(
            <Button
                onClick={mockOnClickFunction}
            >
                { label }
            </Button>
        )
    }

    const renderButtonWithToggleMenu(label: string) => {
        render(
            <Button
                toggleList={[
                    {
                        label: firstItemToggleListLabel,
                        onClick: firstItemToggleListMockFunction,
                    },
                    {
                        label: secondItemToggleListLabel,
                        onClick: secondItemToggleListMockFunction,
                    },
                ]}
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
        renderButtonWithToggleMenu()
    })
})
