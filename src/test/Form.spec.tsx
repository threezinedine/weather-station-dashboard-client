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
    const onSubmitErrorStub = jest.fn()

    const valueAttribute = "value"

    const usernameName = "username"
    const usernameLabel = "Username"
    const passwordName = "password"
    const passwordLabel = "Password"
    const submitButtonTestId = "submitBtn"

    const testUsername = "threezinedine"
    const testPassword = "threezinedine"

    const testUsernameWithLessThanFiveCharacters = "thre"
    const testUsernameWithMoreThanTwentyCharacters = "threezinedinetesting"

    const usernameMustHaveMoreThanFiveCharactersErrorMessage = "Username must have more than five characters."
    const usernameMustHaveLessThanTwentyCharactersErrorMesssage = "Username must have less than twenty characters."

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
                                validator: (value: string) => value.length >= 20,
                                message: usernameMustHaveLessThanTwentyCharactersErrorMesssage
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
                onSubmitError={onSubmitErrorStub}
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
        enterUsernameAndPasswordThenSubmit(testUsername, testPassword)
        expect(screen.getByTestId(usernameName)).toHaveAttribute(valueAttribute, testUsername)
    })

    it("should run the onSubmit component when the loginBtn is clicked", () => {
        enterUsernameAndPasswordThenSubmit(testUsername, testPassword)
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

    it("should appear the min characters when the < 5 characters value is enter into the input then be blurred.", () => {
        enterUsernameAndPasswordThenSubmit(testUsernameWithLessThanFiveCharacters, testPassword)
        expect(screen.getByText(usernameMustHaveMoreThanFiveCharactersErrorMessage))
    })

    it("should call onSubmitError when the > 20 characters value is enter into the input then be blurred.", () => {
        enterUsernameAndPasswordThenSubmit(testUsernameWithMoreThanTwentyCharacters, testPassword)
        expect(screen.getByText(usernameMustHaveLessThanTwentyCharactersErrorMesssage))
    })

    it("should call the onSubmitError when the min characters when the < 5 characters value is enter into the input then be blurred.", () => {
        enterUsernameAndPasswordThenSubmit(testUsernameWithLessThanFiveCharacters, testPassword)
        expect(onSubmitErrorStub).toHaveBeenCalledWith([
            usernameMustHaveMoreThanFiveCharactersErrorMessage,
        ])
    })

    it("should not display the error when the input value is valid again", () => {
        enterUsernameAndPasswordThenSubmit(testUsernameWithLessThanFiveCharacters, testPassword)
        enterUsernameAndPasswordThenSubmit(testUsername, testPassword)

        expect(screen.queryByText((usernameMustHaveLessThanTwentyCharactersErrorMesssage))).toBeNull()
    })

    const enterUsernameAndPasswordThenSubmit = (username: string, password: string): void => {
        userEvent.type(screen.getByTestId(usernameName), username)
        userEvent.type(screen.getByTestId(passwordName), password)
        userEvent.click(screen.getByTestId(submitButtonTestId))
    }
})
