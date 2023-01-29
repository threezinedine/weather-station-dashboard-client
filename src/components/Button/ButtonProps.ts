import React from "react"


export interface DropdownItemProps {
    label: string
    onClick: () => void
}


export default interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    toggleList?: DropdownItemProps[]
    fit?: boolean
    noColor?: boolean
    haveHover?: boolean
    wrapperStyle?: string
    leftTextAlign?: boolean
}
