interface FormFieldProps {
    name: string 
    label: string
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
    FormFieldResponseProps,
}
