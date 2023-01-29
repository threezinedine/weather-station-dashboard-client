import React from "react"


export default interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    fit?: boolean
}
