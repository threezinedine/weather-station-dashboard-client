import React from "react"
import {
    useSelector,
} from "react-redux/es/exports"

import WrapperProps from "./WrapperProps"
import { 
    StoreState,
} from "stores"


const Wrapper: React.FC<WrapperProps> = ({
    children,
}) => {
    const errorMessage: string = useSelector((state: StoreState): string => state.ErrorReducer.errorMessages[0])

    return (
        <div>
            { children }
            <div>
                { errorMessage } 
            </div>
        </div>
    )
}


export default Wrapper
