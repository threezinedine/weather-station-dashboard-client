import React, {useState} from "react"

import FormProps, {
    FormFieldProps,
    FormFieldErrorProps,
    FormFieldResponseProps,
} from "./FormProps"

import {
    EMPTY_STRING,
    FORM_SUBMIT_BUTTON_TEST_ID,
} from 'const'


const Form: React.FC<FormProps> = ({
    fields, 
    onSubmit,
    onSubmitError,
}) => {
    const [response, setResponse] = useState((): FormFieldResponseProps[] => {
        const response: FormFieldResponseProps[] = []
        fields.reduce((prev: FormFieldResponseProps[], curr: FormFieldProps): FormFieldResponseProps[] => {
            prev.push({
                name: curr.name,
                value: EMPTY_STRING
            })
            
            return prev
        }, response)
        return response
    })

    const [errorMessages, setErrorMessages] = useState(new Array(response.length).fill(EMPTY_STRING))

    const updateValue = (name: string, value: string): void => {
        const newResponse = JSON.parse(JSON.stringify(response))
        for (let i=0; i<newResponse.length; i++) {
            if (newResponse[i].name === name) {
                newResponse[i].value = value
            }
        }
        setResponse(newResponse)
    }

    const removeErrorMessageByIndex = (index: number): void => {
        const newErrorMessages = [...errorMessages]
        newErrorMessages[index] = EMPTY_STRING
        setErrorMessages(newErrorMessages)
    }

    const setErrorMessageByIndex = (index: number, message: string): void => {
        const newErrorMessages = [...errorMessages]
        newErrorMessages[index] = message
        setErrorMessages(newErrorMessages)
    }

    return (
        <div>
            { 
                response.map((field: FormFieldResponseProps, index: number) => 
                    (
                        <div
                            key={index}
                        >
                            <label htmlFor={field.name}>{ fields[index].label }</label>
                            <input 
                                name={field.name}
                                value={field.value}
                                onChange={(evt): void => {
                                    updateValue(field.name, evt.target.value)  
                                    removeErrorMessageByIndex(index)
                                }}
                                onBlur={(): void => {
                                    const { errors } = fields[index]

                                    errors.forEach((error: FormFieldErrorProps) => {
                                        if (error.validator(response[index].value, response)) {
                                            setErrorMessageByIndex(index, error.message)
                                        }
                                    })
                                }}
                                data-testid={field.name} 
                            /> 
                            <div>
                                { errorMessages[index] }
                            </div>
                        </div>
                    ))
            }
            <div>
                <button
                    data-testid={FORM_SUBMIT_BUTTON_TEST_ID}
                    onClick={() => {
                        if (checkWhetherAllMessagesAreNotEmptyString(errorMessages)) {
                            onSubmit(response)
                        } else {
                            onSubmitError(filterAllEmtryStringMessagesInTheArray(errorMessages))
                        }
                    }}
                >
                    Login
                </button>  
            </div>
        </div>
    )
}


const checkWhetherAllMessagesAreNotEmptyString = (messages: string[]): boolean => {
    return messages.every((message: string) => message === EMPTY_STRING)
}

const filterAllEmtryStringMessagesInTheArray = (messages: string[]): string[] => {
    return messages.filter((message: string) => message !== EMPTY_STRING)
}


export default Form
