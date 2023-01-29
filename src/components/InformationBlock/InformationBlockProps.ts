export interface InformationFieldProps {
    label: string 
    value: string | number
}


export default interface InformationBlockProps {
    title: string
    fields: InformationFieldProps[]
}
