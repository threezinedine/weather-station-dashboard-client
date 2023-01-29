import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Button,
} from "components"


describe("Testing button", () => {
    const buttonLabel = "Button"

    const renderButton = (label: string) => {
        render(
            <Button>
                { label }
            </Button>
        )
    }

    it("should have the button text", () => {
        renderButton(buttonLabel)
        expect(screen.getByText(buttonLabel)).toBeInTheDocument()
    })
})
