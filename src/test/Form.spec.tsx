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

    const testUsernameWithLessThanFiveCharacters = "thre"
    const testUsernameWithMoreThanTenCharacters = "threezinedinetesting"

    const usernameMustHaveMoreThanFiveCharactersErrorMessage = "Username must have more than five characters."
    const usernameMustHaveLessThanTenCharactersErrorMesssage = "Username must have less than ten characters."

    beforeEach(() => {
        render(
            <Form 
                fields={[
                    {
                        name: usernameName,
                        label: usernameLabel,
                        errors: [
                            {
                                validator: (value: string) => value.length <= 5,
                                message: usernameMustHaveMoreThanFiveCharactersErrorMessage
                            },
                            {
                                validator: (value: string) => value.length >= 10,
                                message: usernameMustHaveLessThanTenCharactersErrorMesssage
                            },
                        ],
                    },
                    {
                        name: passwordName,
                        label: passwordLabel,
                        errors: [],
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
        expect(screen.getByText(usernameLabel)).toBeInTheDocument()
        expect(screen.getByText(passwordLabel)).toBeInTheDocument()
    })

    it("should update the username input when the user typing into the document", () => {
        enterUsernameAndPassword()
        expect(screen.getByTestId(usernameName)).toHaveAttribute(valueAttribute, testUsername)
    })

    it("should run the onSubmit component when the loginBtn is clicked", () => {
        enterUsernameAndPassword()
        expect(onSubmitStub).toHaveBeenCalledWith([
            {
                name: usernameName,
                value: testUsername 
            },
            {
                name: passwordName,
                value: testPassword 
            }
        ])

    })

    it('should appear the min characters when the < 5 characters value is enter into the input then be blurred.', () => {
        userEvent.type(screen.getByTestId(usernameName), testUsernameWithLessThanFiveCharacters)
        userEvent.tab()

        expect(screen.getByText(usernameMustHaveMoreThanFiveCharactersErrorMessage))
    })

    it('should appear the max characters when the > 10 characters value is enter into the input then be blurred.', () => {
        userEvent.type(screen.getByTestId(usernameName), testUsernameWithMoreThanTenCharacters)
        userEvent.tab()

        expect(screen.getByText(usernameMustHaveLessThanTenCharactersErrorMesssage))
    })

    const enterUsernameAndPassword = (): void => {
        userEvent.type(screen.getByTestId(usernameName), testUsername)
        userEvent.type(screen.getByTestId(passwordName), testPassword)
        userEvent.click(screen.getByTestId(submitButtonTestId))
    }
})
