import React from "react"
import {
    render,
    screen,
} from '@testing-library/react'

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
    })
})
