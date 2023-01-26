import React from "react"
import {
    useDispatch,
} from "react-redux"

import { 
    Form,
} from "components"
import {
    FormFieldResponseProps,
} from "components/Form"
import { 
    addErrorAction,
    popErrorAction,
} from "stores/Error/actions"


const RegisterPage: React.FC = () => {
    const dispath = useDispatch()

    return (
        <div>
            <Form 
                fields={[
                    {
                        name: "username",
                        label: "Username",
                        errors: [
                            {
                                validator: (value: string) => value.length <= 5,
                                message: "Username must have more than 5 characters.",
                            },
                            {
                                validator: (value: string) => value.length >= 20,
                                message: "Username must have less than 20 characters.",
                            },
                            {
                                validator: (value: string) => !/^[a-zA-Z0-9]*$/.test(value),
                                message: "Username cannot contain the specical characters.",
                            },
                        ],
                    },
                    {
                        name: "password",
                        label: "Password",
                        password: true,
                        errors: [
                            {
                                validator: (value: string) => value.length <= 5,
                                message: "Password must have more than 5 characters.",
                            },
                            {
                                validator: (value: string) => value.length >= 20,
                                message: "Password must have less than 20 characters.",
                            },
                            {
                                validator: (value: string) => !/^[a-zA-Z0-9]*$/.test(value),
                                message: "Password cannot contain the specical characters.",
                            },
                        ],
                    },
                    {
                        name: "valid",
                        label: "Password Validator",
                        password: true,
                        errors: [
                            {
                                validator: (value: string, fields: FormFieldResponseProps[]): boolean => {
                                    let result = false 
                                    fields.forEach((field: FormFieldResponseProps) => {
                                        if (field.name === "password") {
                                            result = field.value !== value
                                        }
                                    })
                                    return result
                                },
                                message: "Valid password does not match.",
                            },
                        ],
                    }
                ]}
                submitLabel="Login"
                onSubmit={() => {
                    console.log("Here")
                }}
                onSubmitError={() => {
                    dispath(addErrorAction("Register error"))

                    setTimeout(() => {
                        dispath(popErrorAction())
                    }, 2000)
                }}
            />
        </div>
    )
}


export default RegisterPage
