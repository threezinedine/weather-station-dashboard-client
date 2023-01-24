import React, {useState} from "react"

import FormProps, {
    FormFieldProps,
    FormFieldResponseProps,
} from "./FormProps"


const Form: React.FC<FormProps> = ({
    fields, 
    onSubmit,
}) => {
    const [response, setResponse] = useState((): FormFieldResponseProps[] => {
        const response: FormFieldResponseProps[] = []
        fields.reduce((prev: FormFieldResponseProps[], curr: FormFieldProps): FormFieldResponseProps[] => {
            prev.push({
                name: curr.name,
                value: ""
            })
            
            return prev
        }, response)
        return response
    })

    const updateValue = (name: string, value: string): void => {
        const newResponse = JSON.parse(JSON.stringify(response))
        for (let i=0; i<newResponse.length; i++) {
            if (newResponse[i].name === name) {
                newResponse[i].value = value
            }
        }
        setResponse(newResponse)
    }

    return (
        <div>
            { 
                response.map((field: FormFieldResponseProps, index: number) => 
                    (
                        <input 
                            key={index}
                            value={field.value}
                            onChange={(evt): void => {
                                updateValue(field.name, evt.target.value)  
                            }}
                            data-testid={field.name} 
                        /> 
                    ))
            }
            <div>
                <button
                    data-testid="loginBtn"
                    onClick={() => {
                        const data: FormFieldResponseProps[] = []
                        onSubmit(data)
                    }}
                >
                    Login
                </button>  
            </div>
        </div>
    )
}


export default Form
