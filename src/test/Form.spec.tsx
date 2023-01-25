import React from "react"
import {
    render,
    screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { 
    Form,
} from "components"
import { 
    FormFieldResponseProps,
} from "components/Form"
import {
    FORM_SUBMIT_BUTTON_TEST_ID,
} from "const"


describe("The <Form /> Component Testing", () => {
    const onSubmitStub = jest.fn()
    const onSubmitErrorStub = jest.fn()

    const valueAttribute = "value"

    const usernameName = "username"
    const usernameLabel = "Username"
    const passwordName = "password"
    const passwordLabel = "Password"

    const testUsername = "threezinedine"
    const testPassword = "threezinedine"

    const testUsernameWithLessThanFiveCharacters = "thre"
    const testPasswordThatDoesNotMatchTheUsername = "threezinedine1"
    const testUsernameWithMoreThanTwentyCharacters = "threezinedinetesting"

    const usernameMustHaveMoreThanFiveCharactersErrorMessage = "Username must have more than five characters."
    const usernameMustHaveLessThanTwentyCharactersErrorMesssage = "Username must have less than twenty characters."
    const passwordDoesNotMatchErrorMessage = "Password does not match."

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
                        password: true,
                        errors: [
                            {
                                validator: (value: string, fields: FormFieldResponseProps[]): boolean => {
                                    let result = false
                                    fields.forEach((field:FormFieldResponseProps) => {
                                        if (field.name === usernameName) {
                                            result = value !== field.value
                                        }
                                    })
                                    return result
                                },
                                message: passwordDoesNotMatchErrorMessage,
                            }
                        ],
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
        expect(screen.getByTestId(FORM_SUBMIT_BUTTON_TEST_ID)).toBeInTheDocument()
        expect(screen.getByText(usernameLabel)).toBeInTheDocument()
        expect(screen.getByText(passwordLabel)).toBeInTheDocument()
    })

    it("should display the type of the password is password", () => {
        expect(screen.getByTestId(passwordName)).toHaveAttribute("type", "password")
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
        enterUsernameAndPasswordThenSubmit(testUsernameWithLessThanFiveCharacters, testUsernameWithLessThanFiveCharacters)
        expect(onSubmitErrorStub).toHaveBeenCalledWith([
            usernameMustHaveMoreThanFiveCharactersErrorMessage,
        ])
    })

    it("should not display the error when the input value is valid again", () => {
        enterUsernameAndPasswordThenSubmit(testUsernameWithLessThanFiveCharacters, testPassword)
        enterUsernameAndPasswordThenSubmit(testUsername, testPassword)

        expect(screen.queryByText((usernameMustHaveLessThanTwentyCharactersErrorMesssage))).toBeNull()
    })

    it("should display the not match error when the password is not same with the username", () => {
        enterUsernameAndPasswordThenSubmit(testUsername, testPasswordThatDoesNotMatchTheUsername)

        expect(screen.queryByText((passwordDoesNotMatchErrorMessage))).toBeInTheDocument()
    })

    const enterUsernameAndPasswordThenSubmit = (username: string, password: string): void => {
        userEvent.type(screen.getByTestId(usernameName), username)
        userEvent.type(screen.getByTestId(passwordName), password)
        userEvent.click(screen.getByTestId(FORM_SUBMIT_BUTTON_TEST_ID))
    }
})
