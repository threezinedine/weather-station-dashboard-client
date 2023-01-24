import React from "react"
import {
    render,
    screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { 
    Form,
} from "components"


describe("The <Form /> Component Testing", () => {
    const onSubmitStub = jest.fn()

    const valueAttribute = "value"

    const usernameName = "username"
    const usernameLabel = "Username"
    const passwordName = "password"
    const passwordLabel = "Password"
    const submitButtonTestId = "submitBtn"

    const testUsername = "threezinedine"
    const testPassword = "threezinedine"

    beforeEach(() => {
        render(
            <Form 
                fields={[
                    {
                        name: usernameName,
                        label: usernameLabel,
                    },
                    {
                        name: passwordName,
                        label: passwordLabel,
                    }
                ]}
                onSubmit={onSubmitStub}
            />
        )
    })

    it("should display the 2 components that have data-testid (that match with the input parameters)", () => {
        expect(screen.getByTestId(usernameName)).toBeInTheDocument()
        expect(screen.getByTestId(usernameName)).toBeInTheDocument()
        expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument()
    })

    it("should update the username input when the user typing into the document", () => {
        userEvent.type(screen.getByTestId(usernameName), testUsername)
        expect(screen.getByTestId(usernameName)).toHaveAttribute(valueAttribute, testUsername)
    })

    it.skip("should run the onSubmit component when the loginBtn is clicked", () => {
        userEvent.type(screen.getByTestId(usernameName), testUsername)
        userEvent.type(screen.getByTestId(usernameName), testPassword)
        userEvent.click(screen.getByTestId(submitButtonTestId))
    
        expect(onSubmitStub).toHaveBeenCalledWith([
            {
                name: "username",
                value: "threezinedine"
            },
            {
                name: "password",
                value: "threezinedine"
            }
        ])

    })
})
