import React from "react"
import { 
    render,
    screen,
} from "@testing-library/react"

import { 
    Button,
} from "components"


describe("Testing button", () => {
    it("should have the button text", () => {
        render(
            <Button>
                Button
            </Button>
        )

        expect(screen.getByText("Button")).toBeInTheDocument()
    })
})
