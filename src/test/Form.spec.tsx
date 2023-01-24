import React from "react"
import {
    render,
    screen,
} from '@testing-library/react'
import userEvent from "@testing-library/user-event"

import { 
    Form,
} from "components"


describe('The <Form /> Component Testing', () => {
    it('should display the 2 components that have data-testid (that match with the input parameters)', () => {
        render(
            <Form 
                fields={[
                    {
                        name: "username",
                        label: "Username",
                    },
                    {
                        name: "password",
                        label: "Password",
                    }
                ]}
            />
        )

        expect(screen.getByTestId("username")).toBeInTheDocument()
        expect(screen.getByTestId("password")).toBeInTheDocument()
        expect(screen.getByTestId("loginBtn")).toBeInTheDocument()
    })

    it.skip('should run the onSubmit component when the loginBtn is clicked', () => {
        const onSubmitStub = jest.fn()

        render(
            <Form 
                fields={[
                    {
                        name: "username",
                        label: "Username",
                    },
                    {
                        name: "password",
                        label: "Password",
                    }
                ]}
                onSubmit={onSubmitStub}
            />
        )

        userEvent.type(screen.getByTestId("username"), "threezinedine")
        userEvent.type(screen.getByTestId("password"), "threezinedine")
        userEvent.click(screen.getByTestId("loginBtn"))
    
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
