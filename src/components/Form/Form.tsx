import React from "react"

import FormProps, {
    FormFieldProps,
    FormFieldResponseProps,
} from "./FormProps"


const Form: React.FC<FormProps> = ({
    fields, 
    onSubmit,
}) => {
    return (
        <div>
            { 
                fields.map((field: FormFieldProps, index: number) => 
                    (
                        <input 
                            key={index}
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
