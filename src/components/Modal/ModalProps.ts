import React from "react"


export default interface ModalProps {
    children: React.ReactNode
    title: string
    onClose: () => void
    visible?: boolean
}
