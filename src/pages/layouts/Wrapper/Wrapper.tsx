import React from "react"

import WrapperProps from "./WrapperProps"


const Wrapper: React.FC<WrapperProps> = ({
    children,
}) => {
    return (
        <div>
            { children }
        </div>
    )
}


export default Wrapper
