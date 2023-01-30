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
import { 
    Toast,
} from "components"


const Wrapper: React.FC<WrapperProps> = ({
    children,
}) => {
    const st = combineClassName(styles)
    const errorMessages: string[] = useSelector((state: StoreState): string[] => state.ErrorReducer.errorMessages)
    const notifications: string[] = useSelector((state: StoreState): string[] => state.ErrorReducer.notifications)

    return (
        <div
            className={st("wrapper")}
        >
            { children }
            <Toast 
                errorMessages={errorMessages}
                notifications={notifications}
            />
        </div>
    )
}


export default Wrapper
