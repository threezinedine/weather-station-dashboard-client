import React from "react"
import {
    useSelector,
} from "react-redux/es/exports"

import WrapperProps from "./WrapperProps"
import { 
    StoreState,
} from "stores"
import styles from "./Wrapper.module.scss"
import { 
    combineClassName,
} from "utils"


const Wrapper: React.FC<WrapperProps> = ({
    children,
}) => {
    const st = combineClassName(styles)
    const errorMessage: string = useSelector((state: StoreState): string => state.ErrorReducer.errorMessages[0])

    return (
        <div
            className={st("wrapper")}
        >
            { children }
            <div>
                { errorMessage } 
            </div>
        </div>
    )
}


export default Wrapper
