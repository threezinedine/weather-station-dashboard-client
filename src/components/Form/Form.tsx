import React from "react"

import FormProps, {
    FormFieldProps,
} from "./FormProps"


const Form: React.FC<FormProps> = ({
    fields, 
}) => {
    return (
        <div>
            { 
                fields.map((field: FormFieldProps, index: number) => 
                    (
                        <input 
                            key={index}
                            data-testid={field.name} /> 
                    ))
            }
        </div>
    )
}


export default Form
