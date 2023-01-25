interface FormFieldErrorProps {
    validator: (value: string, fields: FormFieldResponseProps[]) => boolean
    message: string
}


interface FormFieldProps {
    name: string 
    label: string
    errors: FormFieldErrorProps[]
    password?: boolean
}


interface FormFieldResponseProps {
    name: string
    value: string
}


export default interface FormProps {
    fields: FormFieldProps[]
    onSubmit: (data: FormFieldResponseProps[]) => void
    onSubmitError: (errorMessages: string[]) => void
    submitLabel: string
}


export type {
    FormFieldProps,
    FormFieldErrorProps,
    FormFieldResponseProps,
}
