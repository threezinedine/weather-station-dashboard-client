export default interface InputProps {
    name: string
    label: string
    value: string
    password?: boolean
    onChange: (evt: any) => void
    onBlur: () => void
    errorMessage: string
}
