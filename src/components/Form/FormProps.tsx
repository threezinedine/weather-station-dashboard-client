interface FormFieldProps {
    name: string 
    label: string
}


export default interface FormProps {
    fields: FormFieldProps[]
}


export type {
    FormFieldProps,
}
