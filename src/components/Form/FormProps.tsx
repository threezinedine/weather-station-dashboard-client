interface FormFieldErrorProps {
    validator: (value: string) => boolean
    message: string
}


interface FormFieldProps {
    name: string 
    label: string
    errors: FormFieldErrorProps[]
}


interface FormFieldResponseProps {
    name: string
    value: string
}


export default interface FormProps {
    fields: FormFieldProps[]
    onSubmit: (data: FormFieldResponseProps[]) => void
}


export type {
    FormFieldProps,
    FormFieldErrorProps,
    FormFieldResponseProps,
}
