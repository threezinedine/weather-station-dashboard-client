import React from "react"


export default interface ModalProps {
    children: React.ReactNode
    onClose: () => void
    visible?: boolean
}
